import { Request, Response } from "express";
import { cleanRequest } from "../lib/helper";
import { historyModel, IDriver, IHistory } from "../model/history.model";
import { restaurantModel, IRestaurant } from "../model/restaurant.model";
import { menuModel } from "../model/menu.model";


export async function getOrderHandler(req: Request, res: Response) {
    try{
        //If Query is empty, get All Menu
        //Else find spesific menu based on query
        if(JSON.stringify(req.query) === '{}'){
            const allOrder = await historyModel.find({}).exec();
            
            res.status(200);
            res.send({
                status: "Success",
                data: allOrder,
            })
            return;
        }else{
            const allOrder = await historyModel.find(req.query).exec();
            res.status(200);
            res.send({
                status: "Success",
                data: allOrder,
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

export async function postOrderHandler(req: Request<{}, {}, {
    data: {
        phoneNumb: number,
        timeStamp?: Date,
        driver: IDriver,
        restaurantQ: IRestaurant,
        allOrder: [{name: string, quantity: number}],
    }
},{} >, res: Response){
    const data : Object = req.body.data;

    if(typeof data == undefined){
        res.status(400);
        res.send({
            status: 'Error',
            data: 'Bad Request',
        })
    }

    const cleanData: Object = cleanRequest(data);

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

    var allOrderId = [];
    var totalPrice : number = 0;

    /* @ts-ignore */
    /*@ts-ignore*/
    for(let order in cleanData['allOrder']){
        /* @ts-ignore */
        const menuFound = await menuModel.findOne({name : cleanData['allOrder'][order]['name'], restaurantId: restFound._id}).exec();
        
        // /* @ts-ignore */
        // console.log({name: order['name'], restaurantId: restFound._id});
        
        if(menuFound == null){
            res.status(400);
            res.send({
                status: "Error",
                data : "Menu not found",
            })
            return;
        }
        /*@ts-ignore */
        const quan = cleanData['allOrder'][order]['quantity'];

        allOrderId.push({menuId: menuFound._id, quantity: quan});
        /* @ts-ignore */
        totalPrice += (menuFound.price) * quan;
    }

    /* @ts-ignore */
    cleanData['allOrder'] = allOrderId;
    /* @ts-ignore */
    cleanData['totalPrice'] = totalPrice;

    const newOrder = await historyModel.create(cleanData);

    res.status(200);
    res.send({
        status: 'Success',
        data: newOrder,
    });
    return;
}

export async function updateOrderHandler(req: Request<{}, {}, {data: IHistory}, {
    phoneNumb: number,
    timeStamp: Date,
}>, res: Response) {
    try{
            const phoneNumb : number = req.query.phoneNumb;
            const timeStamp : Date = req.query.timeStamp;
        
            const newOrder = await historyModel.findOneAndUpdate({phoneNumb: phoneNumb, timeStamp: timeStamp}, req.body.data, {returnDocument: 'after'}).exec();
        
            res.status(200);
            res.send({
                status: "Success",
                data: newOrder,
            })
    }catch(err: any){
        res.status(400);
        res.send({
            status: "Error",
            data: err,
        })  
    }
}