
require('dotenv').config();

interface IRoute {
    url : string,
    ratelimit? : {
        windowMs: number,
        max : number,
    },
    proxy: {
        target: string,
        changeOrigin: boolean,
        pathRewrite: {
            [RegExp: string] : string
        }
    }
}


const routes : IRoute[]= [
    {
        url: '/user',
        proxy:{
            target: process.env.API_USER as string,
            changeOrigin: true,
            pathRewrite:{
                ['^/user/profile'] : `/profile`,
                ['^/user/authen'] : `/authen`,
                ['^/user/hist'] : `/hist`,
            }
        }
    },{
        url: '/gofood',
        proxy: {
            target: process.env.API_GOFOOD as string,
            changeOrigin: false,
            pathRewrite: {
                ['^/gofood/menu'] : '/menu',
                ['^/gofood/restaurant'] : '/restaurant',
                ['^/gofood/hist'] : '/hist',
            }
        }
    }
]

export default routes;
