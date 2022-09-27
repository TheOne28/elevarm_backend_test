import mongoose, { Schema, Types, Document, Model } from "mongoose";

interface IAddress extends Document{
    name: string;
    address: string;
}

interface IUser extends Document{
    _id: Types.ObjectId;
    name: string;
    email: string;
    photo?: string;
    phoneNumb: number;
    isVerified: boolean;
    pin : number;
    savedAddress: Types.Array<IAddress>;
    friends: Types.Array<string>;
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
        type: Number
    },
    friends: {
        type: [String],
        default: [],
    }, 
    savedAddress: {
        type: [{
            name: String,
            address: String,
        }]
    }
})

const userModel : Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default userModel;
