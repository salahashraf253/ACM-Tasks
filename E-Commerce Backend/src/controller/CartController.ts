import express from 'express';
import statusCode from '../constants/StatusCode';
import Cart from '../model/Cart';
const User=require('../model/user').User;
import Product from '../model/Product';
const { ObjectID, default: BSON } = require("bson");

export async function addProduct(request: express.Request, response: express.Response) {
    const userId=request.params.userId;
    const productId=request.params.productId;
    const productFilter={"_id":productId};
    let productToAdd:any= await Product.findOne(productFilter);
    //update product quantity
    productToAdd.quantity-=1;
    await Product.updateOne(productFilter, {$set:productToAdd});

    const quantity:any=1;
    const price:any=productToAdd.price;
    const productName:any=productToAdd.name;

    let cart=await Cart.findOne({"createdBy.id":userId});
    if (cart) {
    //     //cart exists for user
        const itemIndex=cart.products.findIndex(p => p.productId as unknown === productId);
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem:any = await cart.products[itemIndex] ;
          productItem.quantity +=1;
          cart.products[itemIndex] = productItem;
          cart.totalPrice+=productItem.price?productItem.price:0;
        } 
        else {
          //product does not exists in cart, add new item
          cart.products.push({productName,quantity,price,productId});
        }
        cart = await cart.save();
        return response.status(statusCode.CREATED).send(cart);
    }
    else {
        //no cart for user, create new cart
        const user=await User.findOne({"id":userId});
        const newCart = await Cart.create({
          products: [{ productName, quantity,  price,productId }],
          totalPrice:price,
          createdBy:user,
          createdAt: new Date()
        });
        return response.status(statusCode.CREATED).send(newCart);
    }

}
export async function getCart(request: express.Request, response: express.Response) {
    const userId=request.params.userId;
    const filter={"createdBy.id":userId};
    if(await Cart.exists(filter)){
        Cart.find(filter)
        .then((result)=>{
            return response.json(result);  
        })
    }   
    else {
        return response.send("User doesn't have a cart yet.");
    }
}
export async function removeProduct(request: express.Request, response: express.Response) {
    const userId=request.params.userId;
    const productId=request.params.productId;
    const productFilter={"_id":productId};
    const productToDelete: any=await Product.findOne(productFilter);
    let cart=await Cart.findOne({"createdBy.id":userId});
    if(cart && productToDelete){
        productToDelete.quantity+=1;
        await Product.updateOne(productFilter,{$set:productToDelete});

        const itemIndex=cart.products.findIndex(p => p.productId as unknown == productId);
        let productItem :any= cart.products[itemIndex];
        productItem.quantity-=1;
        if(productItem.quantity<=0){
            await cart.deleteOne({"products.productId":productId});
            if(await cart.products.length==0){
                await cart.delete()
                .then(()=>{
                    return response.status(statusCode.OK).json("Cart is deleted");
                })
                .catch((err:any)=>{
                    return response.status(statusCode.OK).json("Cart is deleted");
                })
            }
        }
        else {
            cart.products[itemIndex]=productItem;
        }
        cart.totalPrice-=productToDelete.price;
        cart = await cart.save();
        return response.status(statusCode.OK).json(cart);
    }
    else{
        console.log("Wrong data for product id or user id");
    }
}
