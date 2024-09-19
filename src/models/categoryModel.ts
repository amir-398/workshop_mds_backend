import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  price: number;
  discount_price: number;
  description: string;
  images: mongoose.Types.ObjectId[]; // Référence à une liste d'images
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  description: { type: String, required: true },
});

// Ajout d'un champ virtuel pour lier les images
categorySchema.virtual("images", {
  ref: "Image", // Modèle Image auquel se référer
  localField: "_id", // Champ dans Category
  foreignField: "category", // Champ dans Image où la référence à Category est stockée
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true }); // Assurez-vous que les virtuels sont inclus dans les réponses JSON

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
