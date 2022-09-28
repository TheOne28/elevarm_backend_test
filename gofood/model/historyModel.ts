import mongoose, { Schema, Types, Document, Model } from "mongoose";


interface IDriver extends Document{
    name: string,
    phoneNumb: number,
    vehicleCode: string,
}

interface IOrder extends Document{
    name: string;
    restaurant: string;
    quantity: number;
}

export interface iHistory extends Document{
    _id?: Types.ObjectId;
    restaurant : string;
    phoneNumb: number;
    timeStamp: Date;
    driver: IDriver;
    totalPrice: number;
    allOrder: Types.Array<IOrder>;
}


const historySchema : Schema = new Schema({
    restaurant: {
        type: String,
        required: true,
    },
    phoneNumb: {
        type: Number,
        required: true,
    }, 
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
    driver: {
        type: {
            name : String,
            phoneNumb: Number,
            vehicleCode: String,
        },
        required: true,
    },
    totalPrice: {
        type: Number,
        require: true,
        min: 0,
    },
    allOrder: {
        type: [{
            name: String,
            restaurant: String,
            quantity: Number,
        }],
        required: true,
    }
})

export const historyModel : Model<iHistory> = mongoose.model<iHistory>('History', historySchema);

