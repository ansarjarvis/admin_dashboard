import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

let Product = mongoose.model("Product", ProductSchema);

export default Product;
