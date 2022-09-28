import mongoose, { Schema, Types, Document, Model } from "mongoose";

interface IAddress extends Document{
    name: string;
    address: string;
}

export interface IUser extends Document{
    _id?: Types.ObjectId;
    name: string;
    email: string;
    photo?: string;
    phoneNumb: number;
    isVerified: boolean;
    pin : string;
    savedAddress?: Types.Array<IAddress>;
    friends?: Types.Array<number>;
}


const userSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: false,
    }, 
    phoneNumb: {
        type: Number,
        required: true,
    }, 
    isVerified:{
        type: Boolean,
        default: false,
    },
    pin : {
        type: String,
        require: true,
    },
    friends: {
        type: [Number],
        default: [],
    }, 
    savedAddress: {
        type: [{
            name: String,
            address: String,
        }]
    }
})

export const userModel : Model<IUser> = mongoose.model<IUser>('User', userSchema);

