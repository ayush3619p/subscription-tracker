import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../database/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";


// Path: /api/v1/auth/sign-up
export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const { name, email, password } = req.body;

        // Check if user already exists with the provided email

        const existingUser = await  User.findOne( { email } );

        if( existingUser ){
            const error = new Error("User already exists with this email");
            error.statusCode = 409;
            throw error;
        }

        // Hash the password

        // bycrpt needs string input not number or any other data type, so we need to convert the password to string before hashing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user

        const newUsers = await User.create([{
            name, 
            email,
            password: hashedPassword
        }], { session }); 
        
        // jsonwebtoken for authentication

        const token = jwt.sign({ userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Save the new user to the database

        await session.commitTransaction();
        session.endSession();

        // Send response

        res.status(201).json({
            success:true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        });
        
    }catch( error ){
        await session.abortTransaction();
        session.endSession();
        next( error );
    }


}

// Path: /api/v1/auth/sign-in
export const signIn = async (req, res, next) => {
    try{
        const { email, password } = req.body; 

        // Check if user exists with the provided email
        const user = await User.findOne({ email });

        if( !user ){
            const error = new Error("User not found with this email");
            error.statusCode = 404;
            throw error;
        }

        // Compare the provided password with the hashed password in the database
        const isPassMatch = await bcrypt.compare( password, user.password );

        if( !isPassMatch ){
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            success:true,
            message: "User signed in successfully",
            data: {
                token,
                user,
            }     
        });


    }catch( error ){
        next( error );
    }
} 

// Path: /api/v1/auth/sign-out
export const signOut = async (req, res, next) => {

}
