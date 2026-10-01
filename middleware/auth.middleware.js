import jwt from "jsonwebtoken";

import {JWT_SECRET} from "../config/env.js";

import User from "../database/user.model.js";


const authorize = async ( req, res, next ) => {

    try{

    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
                token = req.headers.authorization.split(" ")[1]; // split the token from the "Bearer" string and get the token part
    }   
    if( !token){
        return res.status(401).json({ message: "Not authorized, no token provided" }); 
    }

    const decoded = jwt.verify( token, JWT_SECRET );

    const user = await User.findById(decoded.userId);

    if( !user ){
        return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user; // attach the user object to the request object for further use in the route handlers

    next();

    }catch( error ){
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

}

export default authorize;