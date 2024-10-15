const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    seller:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
      images: [
        {
          url: {
            type: String,
            required: true,
          }
        },
      ],
      ratings: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      }
})

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
