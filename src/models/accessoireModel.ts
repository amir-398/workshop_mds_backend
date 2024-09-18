import { ColorAccessoireModel } from "./../types/ColorAccessoireModel";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let accessoireModel = new Schema({
  category_id: Number,
  name: String,
  price: Number,
  color: Array<ColorAccessoireModel>(),
});
const Accessoire = mongoose.model("Accessoire", accessoireModel);
export default Accessoire;
