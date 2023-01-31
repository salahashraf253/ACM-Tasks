import express from 'express';
import statusCode from '../constants/StatusCode';
import Cart from '../model/Cart';
const User=require('../model/user').User;
import Product from '../model/Product';
const { ObjectID, default: BSON } = require("bson");

export async function addProduct(request: express.Request, response: express.Response) {
    const userId=request.params.userId;
    const productId=request.params.productId;;
    let productToAdd= await Product.findOne({"_id":(productId)});
    if(!productToAdd){
        productToAdd=new Product();
    }
    const quantity:any=productToAdd.quantity;
    const price:any=productToAdd.price;
    const productName:any=productToAdd.name;
    // await Product.findOne({"_id":(request.params.productId)})
    // .then((result)=>{
    //     productToAdd=result;
    // });
    let cart=await Cart.findOne({"createdBy.id":userId});
    
    if (cart) {
        //cart exists for user
        const itemIndex=cart.products.findIndex(p => p.productId as unknown === productId);

        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          let newProductQuantity:any=productItem.quantity;
          newProductQuantity+= productToAdd.quantity;;
          productItem.quantity =newProductQuantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({productName,quantity,price,productId});
        }
        cart = await cart.save();
        return response.status(statusCode.CREATED).send(cart);
      } else {
        //no cart for user, create new cart
        const user=await User.findOne({"id":userId});
        const newCart = await Cart.create({
          products: [{ productName, quantity,  price,productId }],
          totalPrice:calculateTotalPrice(productToAdd),
          createdBy:user,
          createdAt: new Date()
        });
        return response.status(statusCode.CREATED).send(newCart);
      }

}
function calculateTotalPrice(product:any){
    return product.quantity * product.price as Number;
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

}