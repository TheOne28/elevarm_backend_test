import jwt from 'jsonwebtoken'

require('dotenv').config();

//Expires in 1 hour
export function generateToken(phoneNumb: number, pin: number) : string{
    return jwt.sign({phoneNumb: phoneNumb, pin: pin}, process.env.TOKEN_SECRET as string, {expiresIn: "3600s"});
}

