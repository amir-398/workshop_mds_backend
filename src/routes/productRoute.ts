import express from "express";
import { receiveProduct } from "../controllers/productController";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a product to WooCommerce via the API.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               regular_price:
 *                 type: string
 *               description:
 *                 type: string
 *               short_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */
router.route("/").post(receiveProduct);

module.exports = router;
