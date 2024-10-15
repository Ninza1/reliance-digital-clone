const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User", 
        required:true
    },
    orderItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product", 
                required:true
            },
            quantity:{type:Number, required:true},
            price:{type:Number, required:true}
        }
    ],
    totalAmount:{type:Number, required:true},
    shippingAddress:{
        address: String, 
        city:String, 
        postalCode: String, 
        state:String, 
    }, 
    orderStatus:{
        type:String,
        enum:["processing", "shipped", "delivered"],
        default:"processing",
    },
    createdAt:{type:Date, default:Date.now}
})

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
