import express from 'express';
const User=require('../model/user').User;
import bcrypt from "bcryptjs";
import {comparePassword,hashPassword,generateRandomID}from '../HelperFunctions/index';
import statusCode from '../constants/StatusCode';

export async function login(request: express.Request, response: express.Response) {
    const userFound = await User.findOne({ email: request.body.email });
    if (!userFound) {
        return response.status(statusCode.NOT_AUTHORIZED).json("Not found email");
    }
    const validPassword =await bcrypt.compare(request.body.password, userFound.password);
    // const validPassword =comparePassword(request.body.password.toString(),userFound.password);

    if (!validPassword) {          
        return response.status(statusCode.NOT_AUTHORIZED).json('Wrong Password');
    }
    return response.status(statusCode.OK).send("Signed In.");
}

export async function createUser(request: express.Request, response: express.Response) {
    let userToCreate=new User(request.body);
    userToCreate.id=generateRandomID();
    userToCreate.password= await hashPassword(userToCreate.password);
    userToCreate=await User.create(userToCreate);
    return response.status(statusCode.CREATED).json(`Signed Up. ${userToCreate}`);
}
export async function updateUser(request: any, response: express.Response){
    let userId=request.params.userId;
    let userToUpdate=({
        name:request.body.name,
        password:await hashPassword(request.body.password),
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
export async function deleteUser(request: any, response: express.Response){
    let userId=request.params.userId;
    const filter ={id:userId};
    if(await User.exists(filter)){
        await User.deleteOne({ id: userId });
        return response.json('User deleted successfully.');
    }
    else {
        response.json("User is not found");
    }
}