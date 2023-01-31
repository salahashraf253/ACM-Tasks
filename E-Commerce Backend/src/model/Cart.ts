import mongoose from 'mongoose';
const userSchema=require("./user").userSchema;
const Schema=mongoose.Schema;
const model=mongoose.model;

const cartSchema=new Schema({
    notes: {
        type: String,
        required: false,
    },
    products:{
        type:[
            {
                productName:String,
                quantity:Number,
                price:Number,
                productId: String,
            }
        ]
    },
    totalPrice:{
        type:Number,
        required:true
    },
    createdBy:{
        type:userSchema,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }

});

const Cart= mongoose.model("Cart", cartSchema);
export default Cart;