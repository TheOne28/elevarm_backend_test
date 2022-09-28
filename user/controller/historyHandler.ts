import { Request, Response } from "express";
import {historyModel, IHistory} from "../model/loginHistory.model";

export async function getHistoryHandler(req: Request, res: Response) {
    try{
        //If Query is empty, get All Login History
        //Else find spesific login history based on query
        if(JSON.stringify(req.query) === '{}'){
            const allhistory = await historyModel.find({}).exec();
            
            res.status(200);
            res.send({
                status: "Success",
                data: allhistory,
            })
            return;
        }else{
            const allhistory = await historyModel.find(req.query).exec();
            res.status(200);
            res.send({
                status: "Success",
                data: allhistory,
            })
            return;
        }
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}

export async function postHistoryHandler(req: Request, res: Response) {
    try{
        const newHistory = await historyModel.create(req.body);

        res.status(200);
        res.send({
            status: "Success",
            data: newHistory,
        });

        return ;
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}

export async function updateHistoryHandler(req: Request<{}, {}, {data: IHistory}, {
    phoneNumb: number,
    date: Date,
}>, res: Response){
    try{
        const phoneNumb : number = req.query.phoneNumb;
        const date : Date = req.query.date;
        const data : IHistory = req.body.data;

        const newHistory = await historyModel.findOneAndUpdate({ phoneNumb: phoneNumb, timeStamp: date}, data, {returnDocument:'after'}).exec();

        res.status(200);
        res.send({
            status: "Success",
            data: newHistory,
        })
            
    }catch(err : any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}
