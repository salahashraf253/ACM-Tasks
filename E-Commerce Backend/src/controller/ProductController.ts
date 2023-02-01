import express from 'express';
import Product from '../model/Product';
import { sortProducts } from './Sorting';
const multer=require('multer');
// import {MulterRequest}from 'multer';
interface MulterRequest extends express.Request {
    file: any;
}

export async function createProduct(request: MulterRequest, response: express.Response,) {
    // console.log("file name is: "+request.file);
    let productToCreate=new Product(request.body);
    productToCreate.createdAt=new Date();
    // productToCreate.image=request.file.filename;
    productToCreate=await Product.create(productToCreate);
    return response.status(201).json(`product created ${productToCreate}`);
    // return response.status(200).json("Ok");
}
export async function getProducts(request: express.Request, response: express.Response) {
    const {category,sellerId,orderBy}=request.query;
    const filter=getFilterProduct(category,sellerId);
    
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
        console.log("Error at get all products : "+err);
    });   
}
function getFilterProduct(category:any, sellerId:any){
    let filter:any="";
    if(category&&sellerId){
        filter={"createdBy.id":sellerId, "category":category};
    }
    else if(category){
        filter={"category":category};
    }
    else if(sellerId){
        filter={"createdBy.id":sellerId};
    }
    return filter;
}