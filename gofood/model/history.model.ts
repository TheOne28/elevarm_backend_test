import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IDriver extends Document{
    name: string,
    phoneNumb: number,
    vehicleCode: string,
}

interface IOrder extends Document{
    menuID: Types.ObjectId;
    quantity: number;
}

export interface IHistory extends Document{
    _id?: Types.ObjectId;
    restaurantId: Types.ObjectId;
    phoneNumb: number;
    timeStamp: Date;
    driver: IDriver;
    totalPrice: number;
    allOrder: Types.Array<IOrder>;
}


const historySchema : Schema = new Schema({
    restaurant: {
        type: Types.ObjectId,
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
            menuID: Types.ObjectId,
            quantity: Number,
        }],
        required: true,
    }
})

export const historyModel : Model<IHistory> = mongoose.model<IHistory>('History', historySchema);

