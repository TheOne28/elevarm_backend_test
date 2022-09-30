# Elevarm_Backend_Test  

Vincent Prasetiya Atmadja

## Overview

In this repo, I implement two services according to Gojek, which are Gofood Service and User service.

Gofood service handles GoFood related things, including order, list of menu, and list of restaurant. User services handles user related things, including user Profile and login history. Login and register also part of user services jobs.  

An answer to question number 2 in the assignment, I think there are other services aside from user, GoJek, and GoFood. I think every features that Gojek has, is implemented as different services. For example, GoJek, GoCar, GoPay, GoMart, Jago, etc.

## User

### Model

1. User Model, with data structure  
    1. name : string  
    2. email : string  
    3. photo: string  
    4. phoneNumb: number
    5. isVerified: boolean
    6. pin: string
    7. savedAddress: Array of Address (name and address)
    8. friends: Array of Number (PhoneNumber)
2. Login History Model, with data structure  
    1. phoneNumb : number  
    2. timeStamp : Date

### TechStack Used

Below is some of tech stack that I used

1. Express
2. Mongoose  
3. MongoDB
4. bcrypt
5. jsonwebtoken

### Notes

Pin that saved in database was hashed using bcrypt.

## GoFood

### Model

1. Menu Model, with data structure  
    1. name : string  
    2. type : string  ('Makanan' or 'Minuman')
    3. price: number  
    4. description: string
    5. photo: string
    6. rating?: number
    7. numbOrdered: number
    8. restaurantId: ObjectId references to restaurantID
2. Restaurant Model, with data structure
    1. name: string
    2. address: string
3. History Model, with data structure
    1. restaurantId: ObjectId references to restaurandId in RestaurantModel
    2. phoneNumb: number
    3. timeStamp: Date
    4. driver: {name : string, phoneNumb: number, vehicleCode: string}
    5. totalPrice : number
    6. allOrder: Array of Order (menuID, quantity)

### Tech Stack
Below is some of tech stack that I used

1. Express
2. Mongoose  
3. MongoDB

## API Gateway

### Tech Stack
Below is some of tech stack that I used

1. Express
2. morgan
3. http-proxy-middleware


## Notes

1. Link to docker hub
    1. [User Service](https://hub.docker.com/r/theone28/elevarm-user-service)
    2. [Gofood Service](https://hub.docker.com/r/theone28/elevarm-gofood-service)
    3. [API Gateway](https://hub.docker.com/r/theone28/elevarm-api-gateway)
2. API Documentation is given as postman collection in this repo.
3. env file will be sent along with the email