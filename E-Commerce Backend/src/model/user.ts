import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;

const userSchema=new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 30,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    accountType:{
        type:String,
        requried:true,
        min:5,
        max:6
    },
    phoneNumber:{
        type:String,
        required:true,
        length:11
    }
});

const User = mongoose.model('users', userSchema);
// export default User;
module.exports={User};