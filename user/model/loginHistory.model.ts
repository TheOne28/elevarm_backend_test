import mongoose, { Schema, Types, Document, Model} from "mongoose";

export interface IHistory extends Document{
    _id? : Types.ObjectId;
    phoneNumb: number;
    timeStamp: Date;
}

const historySchema : Schema = new Schema({
    phoneNumb: {
        type: Number,
        required: true,
    },
    timeStamp: {
        type: Schema.Types.Date,
        default: Date.now(),
    }
})

export const historyModel : Model<IHistory> = mongoose.model<IHistory>('LoginHistory', historySchema);
