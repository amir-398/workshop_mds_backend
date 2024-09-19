import express from "express";
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
const router = express.Router();

import upload from "../middlewares/upload";

router
  .route("/add")
  .post(upload.fields([{ name: "images", maxCount: 5 }]), addCategory);

router.route("/").get(getCategories);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
