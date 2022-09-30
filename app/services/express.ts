import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

import routes from '../routes';

class ExpressInstance{
    private static expressInstance : ExpressInstance;
    
    private _app: express.Application;

    private constructor(){
        this._app = express();

        this._app.use(cors());

        this._app.use(express.json({limit: '50mb'}));
        this._app.use(express.urlencoded({limit: '50mb', extended:true}));
        this._app.use(morgan('combined'));

        routes.forEach(route => {
            this._app.use(route.url, createProxyMiddleware(route.proxy));
        });
    }

    public static getInstance(): ExpressInstance{
        if( !ExpressInstance.expressInstance){
            ExpressInstance.expressInstance = new ExpressInstance()
        }

        return ExpressInstance.expressInstance;
    }

    public getApp(): express.Application{
        return this._app;
    }

}

const expressInstance : ExpressInstance= ExpressInstance.getInstance();
export default expressInstance;