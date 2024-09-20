import express from "express";
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController";
import upload from "../middlewares/upload";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - Categories
 * /categories/add:
 *   post:
 *     summary: Add a new category
 *     description: Create a new category with associated images.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: "Gameboy Color"
 *                 description: game console name
 *               price:
 *                 type: number
 *                 default: "250"
 *                 description: Price of the console
 *               discount_price:
 *                 type: number
 *                 default: "40"
 *                 description: Discounted price of the console
 *               description:
 *                 type: string
 *                 default: "A handheld game console"
 *                 description: Description of the console
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error adding category
 */
router
  .route("/add")
  .post(upload.fields([{ name: "images", maxCount: 5 }]), addCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Fetch all categories along with their associated images.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Error fetching categories
 */
router.route("/").get(getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category
 *     description: Fetch a single category by its ID along with associated images.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error fetching category
 *   put:
 *     summary: Update a category
 *     description: Update the details of a specific category.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               discount_price:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category and its associated images by ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 */
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
