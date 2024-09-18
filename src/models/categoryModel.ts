import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  price: number;
  discount_price: number;
  images: mongoose.Types.ObjectId[]; // Référence à une liste d'images
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
});

// Ajout d'un champ virtuel pour lier les images
categorySchema.virtual("images", {
  ref: "Image", // Modèle auquel se référer (Image)
  localField: "_id", // Clé locale
  foreignField: "category", // Clé étrangère dans le modèle Image
});

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
