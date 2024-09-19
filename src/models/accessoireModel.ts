import { ColorAccessoireModel } from "./../types/ColorAccessoireModel";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

let accessoireSchema = new Schema({
  category_id: String,
  name: String,
  price: String,
  color: String,
});

accessoireSchema.virtual("images", {
  ref: "Image",
  localField: "_id",
  foreignField: "accessoire",
});

accessoireSchema.set("toObject", { virtuals: true });
accessoireSchema.set("toJSON", { virtuals: true });
const Accessoire = mongoose.model("Accessoire", accessoireSchema);
export default Accessoire;
