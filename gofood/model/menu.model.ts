import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IMenu extends Document{
    _id?: Types.ObjectId;
    name : string;
    type : string;
    price : Number;
    description?: string;
    photo: string;
    rating?: Number;
    numbOrdered?: Number;
    restaurantId: Types.ObjectId;
}


const menuSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum:{
            values: ['Makanan', 'Minuman']
        }
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: true,
    },
    rating : {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    numbOrdered: {
        type: Number,
        default: 0,
    },
    restaurant: {
        type: Types.ObjectId,
        required: true,
    }
})

export const menuModel : Model<IMenu> = mongoose.model<IMenu>('Menu', menuSchema);

