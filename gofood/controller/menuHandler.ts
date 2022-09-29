import { Request, Response } from "express";
import { cleanRequest } from "../lib/helper";
import { menuModel } from "../model/menu.model";
import { restaurantModel, IRestaurant } from "../model/restaurant.model";

export async function getMenuHandler(req: Request, res: Response) {
    try{
        //If Query is empty, get All Menu
        //Else find spesific menu based on query
        if(JSON.stringify(req.query) === '{}'){
            const allmenu = await menuModel.find({}).exec();
            
            res.status(200);
            res.send({
                status: "Success",
                data: allmenu,
            })
            return;
        }else{
            const allmenu = await menuModel.find(req.query).exec();
            res.status(200);
            res.send({
                status: "Success",
                data: allmenu,
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

export async function postMenuHandler(req: Request<{}, {}, {
    data: {
        name: string,
        type: string,
        price: number,
        description? : string,
        photo: string,
        rating?: Number,
        numbOrdered?: Number,
        restaurantQ: IRestaurant,
   }
}, {}>, res: Response) {
    try{
        const data : Object = req.body.data;

        if(typeof data == undefined){
            res.status(400);
            res.send({
                status: "Error",
                data: "Bad Request"
            })
            return;
        }

        const cleanData : Object = cleanRequest(data);
        /*@ts-ignore */
        const restFound = await restaurantModel.exists(cleanData['restaurantQ']).exec();
        

        if(restFound == null){
            res.status(400);
            res.send({
                status: "Error",
                data : "Restaurant not found",
            });
            return;
        }

        /*@ts-ignore */
        cleanData['restaurantId'] = restFound._id;
        /*@ts-ignore*/
        delete cleanData['restaurantQ'];
        
        const existedMenu = await menuModel.exists(cleanData).exec();

        if(existedMenu != null){
            res.status(400);
            res.send({
                status: "Error",
                data : "Menu already added",
            });
            return;
        }

        const newMenu = await menuModel.create(cleanData);

        res.status(200);
        res.send({
            status: "Success",
            data : newMenu,
        })

    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })
    }
}

export async function updateMenuHandler(req: Request<{}, {}, {data: IRestaurant}, {
    name: string,
    restaurantId: string,
}>, res: Response) {
    try{
        const name : string = req.query.name;
        const restaurantId : string = req.query.restaurantId;

        const newMenu = await menuModel.findOneAndUpdate({name: name, restaurantId: restaurantId}, req.body, {returnDocument: 'after'}).exec();

        res.status(200);
        res.send({
            status: "Success",
            data: newMenu,
        })
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })  
    }
}

export async function deleteMenuHandler(req: Request<{}, {}, {}, {
    name: string,
    restaurantId: string,
}>, res: Response){
    try{
        const name : string = req.query.name;
        const restaurantId : string = req.query.restaurantId;

        const deletedMenu = await menuModel.findOneAndDelete({name: name, restaurantId: restaurantId}).exec();

        res.status(200);
        res.send({
            status: "Success",
            data: deletedMenu,
        })
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })  
    }   
}