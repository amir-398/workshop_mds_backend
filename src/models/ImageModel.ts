import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  filePath: string;
  category: mongoose.Types.ObjectId;
}

const imageSchema: Schema = new Schema({
  filePath: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Référence à Category
});

const Image = mongoose.model<IImage>("Image", imageSchema);
export default Image;
