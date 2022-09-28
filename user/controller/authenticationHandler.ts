import { Request, Response} from "express";
import { generatePassword, verifyPassword } from "../lib/hash";
import { generateToken } from "../lib/jwt";
import {userModel, IUser} from "../model/user.model";


export async function loginHandler(req: Request<{}, {}, {}, {phoneNumb : number, pin: number}>, res: Response) {
    try{
        const phoneNumb: number = req.query.phoneNumb;
        const pin : number = req.query.pin;
        
        if(typeof phoneNumb == undefined || typeof pin ==undefined){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }
        const user = await userModel.findOne({phoneNumb: phoneNumb}, 'pin').exec();

        if(user == null){
            res.status(404);
            res.send({
                status: "Error",
                data: "Phone Number not yet registered"
            })
            return;
        }

        const hashPin = user.pin;
        const verified : boolean = await verifyPassword(String(pin), hashPin);

        if(verified){
            const token : string = generateToken(phoneNumb, pin);
            res.status(200);
            res.send({
                status: "Success",
                data: {
                    token: token,
                },
            })
        }else{
            res.status(404);
            res.send({
                status: "Error",
                data: "Wrong Pin",
            })
        }
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}

export async function registerHandler(req: Request<{}, {}, {
    name: string,
    email: string,
    photo: string,
    phoneNumb: number,
    pin: number
}, {}>, res: Response) {
    try{
        const name : string = req.body.name;
        const email : string = req.body.email;
        const phoneNumb: number = req.body.phoneNumb;
        const pin : number = req.body.pin;
        const photo : string = req.body.photo;
        
        if(typeof name == undefined || typeof email == undefined || typeof phoneNumb == undefined || typeof pin == undefined || typeof photo == undefined ){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }

        const user = await userModel.findOne({phoneNumb: phoneNumb}, 'pin').exec();

        if(user != null){
            res.status(404);
            res.send({
                status: "Error",
                data: "Phone number already existed",
            })
            return;
        }

        const hashPin = await generatePassword(String(pin));

        const newUser = await userModel.create({
            name: name,
            email : email,
            phoneNumb: phoneNumb,
            pin: hashPin,
            photo: photo,
        })

        res.status(200);
        res.send({
            status: "Success",
            data: newUser,
        })


    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })    
    }
}

export async function updateUser(req: Request<{}, {}, {}, {
    phoneNumb: number,
    data : IUser
}>, res: Response) {
    
    try{
            const phoneNumb : number = req.query.phoneNumb;
            const data: IUser = req.query.data;
        
            if(typeof phoneNumb == undefined || typeof data == undefined){
                res.status(400);
                res.send({
                    status: "Error",
                    data: "Bad Request"
                })
                return;
            }
        
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