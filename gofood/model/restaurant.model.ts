import mongoose, { Schema, Types, Document, Model } from "mongoose";


export interface IRestaurant extends Document{
    _id?: Types.ObjectId;
    name: string,
    address: string,
}

const restaurantSchema : Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

export const restaurantModel : Model<IRestaurant> = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);

