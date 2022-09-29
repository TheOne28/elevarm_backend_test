import { Request, Response } from "express";
import { restaurantModel, IRestaurant } from "../model/restaurant.model";
import { menuModel } from "../model/menu.model";

export async function getRestoHandler(req: Request, res: Response) {
    try{
        //If Query is empty, get All Menu
        //Else find spesific menu based on query
        if(JSON.stringify(req.query) === '{}'){
            const allresto = await restaurantModel.find({}).exec();
            
            res.status(200);
            res.send({
                status: "Success",
                data: allresto,
            })
            return;
        }else{
            const allresto = await restaurantModel.find(req.query).exec();
            res.status(200);
            res.send({
                status: "Success",
                data: allresto,
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

export async function postRestoHandler(req: Request<{}, {}, {
    name: string,
    address: string,
}, {}>, res: Response) {
    try{
        const name : string = req.body.name;
        const address : string = req.body.address; 
        
        if(typeof name == undefined || typeof address == undefined){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }

        const restFound = await restaurantModel.exists({name: name, address: address}).exec();
        

        if(restFound != null){
            res.status(400);
            res.send({
                status: "Error",
                data : "Restaurant already added",
            });
            return;
        }

        const newResto = await restaurantModel.create({name: name, address: address});

        res.status(200);
        res.send({
            status: "Success",
            data : newResto,
        })

    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}

export async function updateRestoHandler(req: Request<{}, {}, {data: IRestaurant}, {
    name: string,
    address: string,
}>, res: Response) {
    try{
        const name : string = req.query.name;
        const address : string = req.query.address;

        const newResto = await restaurantModel.findOneAndUpdate({name: name, address: address}, req.body, {returnDocument: 'after'}).exec();

        res.status(200);
        res.send({
            status: "Success",
            data: newResto,
        })
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })  
    }
}

export async function deleteRestoHandler(req: Request<{}, {}, {}, {
    name: string,
    address: string,
}>, res: Response){
    try{
        const name : string = req.query.name;
        const address : string = req.query.address;

        const deletedResto = await restaurantModel.findOneAndDelete({name: name, address: address}).exec();

        if(deletedResto == null){
            res.status(400);
            res.send({
                status: 'Error',
                data: "Restaurant not found",
            });
            return;
        }

        const id = deletedResto._id;

        const menuDeleted = await menuModel.deleteMany({restaurantId : id});

        res.status(200);
        res.send({
            status: "Success",
            data: {
                deletedResto: deletedResto,
                menuDeleted: menuDeleted,},
        });

    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })  
    }   
}