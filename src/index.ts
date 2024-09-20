import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger/swaggerOptions";
mongoose.connect("mongodb://localhost:27017/workshop_mds");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/categories", require("./routes/categoriesRoute"));
app.use("/accessoires", require("./routes/accessoireRoute"));
app.use("/products", require("./routes/productRoute"));
if (process.env.NODE_ENV !== "test") {
  const port = 3001;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
export default app;
