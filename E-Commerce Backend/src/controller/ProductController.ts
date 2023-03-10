import express from 'express';
import { FilterQuery } from 'mongoose';
import Product, { ProductType } from '../model/Product';
import { sortProducts } from './Sorting';
const fs = require("fs");


export async function createProduct(request:express.Request, response: express.Response,) {
    try{
        let productToCreate=request.body;
        productToCreate.createdAt=new Date();
        if(request.file){
            productToCreate.image = request.file.buffer;
        }
        productToCreate=await Product.create(productToCreate);
        return response.status(201).json(`product created ${productToCreate}`);
    }
    catch(err){
        response.send(err);
    }
}
export async function getProducts(request: express.Request, response: express.Response) {
    const {category,sellerId,orderBy}=request.query;
    let filter;
    if(category instanceof String && sellerId instanceof String) {
        filter=getFilterProduct(category,sellerId);
    }
    let products=new Array();
    Product.find(filter)
    .then((result)=>{
        products=result;
        if(orderBy){
            products=sortProducts(products,orderBy.toString());
        }
        return response.json(products);  
    })
    .catch((err)=>{
        response.send(err);
    });   
}
function getFilterProduct(category:String, sellerId:String){
    let filter:any="";
    if(category&&sellerId){
        filter={"createdBy":sellerId, "category":category};
    }
    else if(category){
        filter={"category":category};
    }
    else if(sellerId){
        filter={"createdBy":sellerId};
    }
    return filter as Document;
}