
export function cleanRequest(data: Object) : Object{
    Object.keys(data).forEach( key => {
        if(typeof data[key as keyof Object] == undefined){
            delete data[key as keyof Object];
        }
    })

    return data;
}