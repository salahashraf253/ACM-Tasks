import express from 'express';
import Product from '../model/Product';
import { sortProducts } from './Sorting';

export async function createProduct(request: express.Request, response: express.Response) {
    let productToCreate=new Product(request.body);
    productToCreate.createdAt=new Date();
    productToCreate=await Product.create(productToCreate);
    return response.status(201).json(`product created ${productToCreate}`);
}
export async function getProducts(request: express.Request, response: express.Response) {
    const {category,sellerId,orderBy}=request.query;
    const filter ={"createdBy.id":sellerId, "category":category};
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
