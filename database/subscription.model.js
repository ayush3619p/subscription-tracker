import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [ true, "Subscription name is required"],
        trim: true,
        minLength: [ 3, "Subscription name must be at least 3 characters long"],
        maxLength: [ 50, "Subscription name must be at most 50 characters long"]
    },

    price:{
        type: Number,
        required: [ true, "Subscription price is required"],
        min: [ 0, "Subscription price must be a positive number"]
    },

    currency:{
        type: String,
        required: [ true, "Currency is required"],
        trim: true,
        uppercase: true,
        enum: {
            values: [ "USD", "EUR", "GBP", "INR" ],
            message: "Currency must be one of USD, EUR, GBP, INR"
        }
    },

    frequency:{
        type: String,
        required: [ true, "Frequency is required"],
        trim: true,
        enum: {
            values: [ "daily", "weekly", "monthly", "yearly" ],
            message: "Frequency must be one of daily, weekly, monthly, yearly"
        }
    },

    category:{
        type: String,
        required: [ true, "Category is required"],
        trim: true,
        enum: {
            values: [ "entertainment", "productivity", "education", "health", "other" ],
            message: "Category must be one of entertainment, productivity, education, health, other"
        }
    },

    paymentMethod:{
        type: String,
        required: [ true, "Payment method is required"], 
        trim: true,
    },

    status:{
        type: String,
        required: [ true, "Status is required"],
        trim: true,
        enum: {
            values: [ "active", "inactive", "cancelled" ],
            message: "Status must be one of active, inactive, cancelled"
        }
    },

    startDate:{
        type: Date,
        required: [ true, "Start date is required"],
        validate:{
            validator: ( value ) => value <= new Date(),
            message: "Start date should be in the past or present"
        }
    },

    renewalDate:{
        type: Date,
        required: [ true, "Renewal date is required"],
        validate:{
            validator: function( value ){
                return value > this.startDate;
            },
            message: "Renewal date should be after the start date"
        }
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "User is required"],
        index: true
    }

}, options = { timestamps: true } );

subscriptionSchema.pre( 'save', function( next ){
    if( !this.renewalDate ){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }; 
    
        this.renewalDate = new Date( this.startDate );
        this.renewalDate.setDate( this.renewalDate.getDate() + renewalPeriods[ this.frequency ] );
    }

        if( this.renewalDate < new Date() ){
            this.status = "expired";
        }

        next();
    
});