import express from "express";
import upload from "../middlewares/upload";
import {
  addAccessoire,
  getAccessoires,
  getAccessoire,
  deleteAccessoire,
  getAccessoiresByCategory,
} from "../controllers/accessoireController";

const router = express.Router();

router
  .route("/add")
  .post(upload.fields([{ name: "images", maxCount: 5 }]), addAccessoire);

router.route("/").get(getAccessoires);

router.route("/:id").get(getAccessoire).delete(deleteAccessoire);
router.route("/byCategory/:category_id").get(getAccessoiresByCategory);

module.exports = router;
