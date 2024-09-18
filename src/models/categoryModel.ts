import mongoose from "mongoose";
const Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: String,
  price: Number,
  discount_price: Number,
  images: Array,
});

let Category = mongoose.model("Category", categorySchema);
export default Category;
