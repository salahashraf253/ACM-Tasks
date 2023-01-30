import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;
const userSchema=require("./user").userSchema;
const productSchema=new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
        type:String,
        requried:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:0
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

const Product= mongoose.model("Product", productSchema);
export default Product;