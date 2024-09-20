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

/**
 * @swagger
 * /accessoires/add:
 *   post:
 *     summary: Add a new accessoire
 *     description: Add a new accessoire with associated images.
 *     tags:
 *       - Accessoires
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: "Boutons"
 *                 description: Accessoire name
 *               price:
 *                 type: string
 *                 default: "10"
 *                 description: Price of the accessoire
 *               color:
 *                 type: string
 *                 default: "Red"
 *                 description: Color of the accessoire
 *               category_id:
 *                 type: string
 *                 default: "60f1b0b3b3b3b3b3b3b3b3b3"
 *                 description: Category ID
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Accessoire created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error adding accessoire
 */
router
  .route("/add")
  .post(upload.fields([{ name: "images", maxCount: 5 }]), addAccessoire);

/**
 * @swagger
 * /accessoires:
 *   get:
 *     summary: Get all accessoires
 *     description: Fetch all accessoires along with their associated images.
 *     tags:
 *       - Accessoires
 *     responses:
 *       200:
 *         description: A list of accessoires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       500:
 *         description: Error fetching accessoires
 */
router.route("/").get(getAccessoires);

/**
 * @swagger
 * /accessoires/{id}:
 *   get:
 *     summary: Get a single accessoire
 *     description: Fetch a single accessoire by its ID along with associated images.
 *     tags:
 *       - Accessoires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The accessoire ID
 *     responses:
 *       200:
 *         description: Accessoire found
 *       404:
 *         description: Accessoire not found
 *       500:
 *         description: Error fetching accessoire
 *   delete:
 *     summary: Delete an accessoire
 *     description: Delete an accessoire and its associated images by ID.
 *     tags:
 *       - Accessoires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The accessoire ID
 *     responses:
 *       200:
 *         description: Accessoire deleted successfully
 *       404:
 *         description: Accessoire not found
 *       500:
 *         description: Error deleting accessoire
 */
router.route("/:id").get(getAccessoire).delete(deleteAccessoire);

/**
 * @swagger
 * /accessoires/byCategory/{category_id}:
 *   get:
 *     summary: Get accessoires by category
 *     description: Fetch all accessoires for a specific category.
 *     tags:
 *       - Accessoires
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Accessoires found
 *       404:
 *         description: Accessoires not found
 *       500:
 *         description: Error fetching accessoires by category
 */
router.route("/byCategory/:category_id").get(getAccessoiresByCategory);

module.exports = router;
