import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
import cors from "cors";

mongoose.connect("mongodb://mongo_db:27017/workshop_mds");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
console.log("tes");
const port = 3001;
app.use("/categories", require("./routes/categoriesRoute"));
app.use("/accessoires", require("./routes/accessoireRoute"));

app.use("/products", require("./routes/productRoute"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
