import express from "express";
import {
  addCategory,
  getCategories,
} from "../controllers/categoriesController";
const router = express.Router();

import upload from "../middlewares/upload";

router
  .route("/add")
  .post(upload.fields([{ name: "images", maxCount: 5 }]), addCategory);

router.route("/").get(getCategories);

module.exports = router;
