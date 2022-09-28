import {Request, Response} from "express";
import { generatePassword } from "../lib/hash";
import { userModel, IUser } from "../model/user.model";

export async function getProfileHandler(req: Request, res: Response) {
    try{
        //If Query is empty, get All Profile
        //Else find spesific user based on query
        if(JSON.stringify(req.query) === '{}'){
            const alluser = await userModel.find({}).exec();
            
            res.status(200);
            res.send({
                status: "Success",
                data: alluser,
            })
            return;
        }else{
            const alluser = await userModel.find(req.query).exec();
            res.status(200);
            res.send({
                status: "Success",
                data: alluser,
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

export async function updateUserHandler(req: Request<{}, {}, {data: IUser}, {
    phoneNumb: number,
}>, res: Response) {
    
    try{
        const phoneNumb : number = req.query.phoneNumb;
        const data: IUser = req.body.data;
        console.log(data);
        
        if(typeof phoneNumb == undefined || typeof data == undefined){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }
        console.log("Here");
        const hashPin = await generatePassword(String(data.pin));
        data.pin = hashPin;
        
        console.log(data);
        const newUser = await userModel.findOneAndUpdate({phoneNumb: phoneNumb}, data, {returnDocument: 'after'}).exec();
            
        res.status(200);
        res.send({
            status: "Success",
            data: newUser,
        })
    }catch(err: any){
        res.status(200);
        res.send({
            status: "Error",
            data: err,
        })
    }
}
