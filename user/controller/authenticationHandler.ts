import { Request, Response} from "express";
import userModel from "../model/user.model";
import { verifyPassword } from "../lib/hash";
import { generateToken } from "../lib/jwt";

export async function loginHandler(req: Request<{}, {}, {}, {phoneNumb : number, pin: number}>, res: Response) {
    try{
        const phoneNumb: number = req.query.phoneNumb;
        const pin : number = req.query.pin;
        
        if(phoneNumb == undefined || pin ==undefined){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }

        userModel.findOne({phoneNumb: phoneNumb}, 'pin', async function(err, data){
            if(err){
                res.status(400);
                res.send({
                    status: "Error",
                    data: err,
                })
            }else{
                if(data != null){
                    const hashPin = data.pin;
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
                }else{
                    res.status(404);
                    res.send({
                        status: "Error",
                        data: "Phone Number not yet registered"
                    })
                }
            }
        });

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
    photo?: string,
    phoneNumb: number,
    pin: number
}, {}>, res: Response) {
    try{
        const name : string = req.body.name;
        const email : string = req.body.email;
        const phoneNumb: number = req.body.phoneNumb;
        const pin : number = req.body.pin;
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })    
    }
}