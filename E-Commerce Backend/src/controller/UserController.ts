import express from 'express';
const User=require('../model/user').User;
import {encryptPassword,generateRandomID}from '../HelperFunctions/index';

export async function createUser(request: express.Request, response: express.Response, next: express.NextFunction) {
    let userToCreate=new User(request.body);
    userToCreate.id=generateRandomID();
    userToCreate.password= await encryptPassword(userToCreate.password);
    userToCreate=await User.create(userToCreate);
    return response.status(201).json(`Signed Up. ${userToCreate}`);
}
export async function updateUser(request: any, response: express.Response, next: express.NextFunction){
    let userId=request.params.userId;
    let userToUpdate=({
        name:request.body.name,
        password:await encryptPassword(request.body.password),
        phoneNumber: request.body.phoneNumber,
        email:request.body.email,
        accountType:request.body.accountType,
        id:userId,
    }); 
    User.updateOne({"id":userId}, {$set: userToUpdate}).then(()=>{
        return response.json('User replaced successfully.');
    }).catch((err:any)=>{
        console.log("Error at update user"+err);
    });
}
export async function deleteUser(request: any, response: express.Response, next: express.NextFunction){
    let userId=request.params.userId;
    await User.deleteOne({ id: userId });
    return response.json('User deleted successfully.');
}