import express from "express";
const router = express.Router();

import { receiveProduct } from "../controllers/productController";

router.route("/").post(receiveProduct);

module.exports = router;
