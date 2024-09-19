import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();

mongoose.connect("mongodb://localhost:27017/workshop_mds");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;
app.use("/categories", require("./routes/categoriesRoute"));
app.use("/accessoires", require("./routes/accessoireRoute"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
