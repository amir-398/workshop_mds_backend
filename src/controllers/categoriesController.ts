import Category from "../models/categoryModel";
import { Request, Response } from "express";
import Image from "../models/ImageModel";
import fs from "fs";
import path from "path";

// ------------------- add category -------------------
const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, price, discount_price, description } = req.body;

    if (!name || !price || !discount_price || !req.files || !description) {
      return res.status(400).send({ message: "field required" });
    }
    console.log(req.files);

    // Créer une nouvelle catégorie
    const category = new Category({
      name: name,
      price: price,
      discount_price: discount_price,
      description: description,
    });

    await category.save();
    // Si des fichiers ont été uploadés, les sauvegarder
    if (req.files && Array.isArray(req.files)) {
      const images = req.files as Express.Multer.File[];
      for (const file of images) {
        const relativePath = path.relative(
          path.join(__dirname, "../public"),
          file.path
        ); // Chemin relatif à partir de "public"

        const newImage = new Image({
          filePath: `/images/${path.basename(file.path)}`, // Chemin à partir de "/images/"
          category: category._id,
        });
        await newImage.save(); // Sauvegarde dans la base de données
      }
    } else if (req.files && req.files["images"]) {
      const images = req.files["images"] as Express.Multer.File[];
      for (const file of images) {
        const relativePath = path.relative(
          path.join(__dirname, "../public"),
          file.path
        ); // Chemin relatif à partir de "public"

        const newImage = new Image({
          filePath: `/images/${path.basename(file.path)}`, // Chemin à partir de "/images/"
          category: category._id,
        });
        await newImage.save(); // Sauvegarde dans la base de données
      }
    }

    res.status(201).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding category" });
  }
};

// ------------------- get all categories -------------------

const getCategories = async (req: Request, res: Response) => {
  try {
    // Récupérer toutes les catégories et remplir les images liées
    const categories = await Category.find().populate({
      path: "images", // Le chemin pour peupler les images liées à chaque catégorie
      model: Image, // Le modèle lié (ici Image)
    });

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching categories with images" });
  }
};

// ------------------- get category by id -------------------
const getCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    // Récupérer toutes les catégories et remplir les images liées
    const category = await Category.findById(categoryId).populate({
      path: "images", // Le chemin pour peupler les images liées à chaque catégorie
      model: Image, // Le modèle lié (ici Image)
    });

    res.status(200).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching categories with images" });
  }
};

// ------------------- update category -------------------
const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { name, price, discount_price, description } = req.body;

    // Trouver la catégorie par ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Mise à jour des champs de la catégorie
    category.name = name || category.name;
    category.price = price || category.price;
    category.discount_price = discount_price || category.discount_price;
    category.description = description || category.description;

    // Sauvegarder la catégorie mise à jour
    await category.save();

    // Chemin absolu du dossier public/images
    const imageDir = path.resolve(process.cwd(), "public", "images");

    // Gestion des images associées à la catégorie
    if (req.files && Array.isArray(req.files)) {
      const newImages = req.files as Express.Multer.File[];

      // Suppression des anciennes images
      const existingImages = await Image.find({ category: categoryId });

      for (const image of existingImages) {
        const absoluteFilePath = path.join(
          imageDir,
          path.basename(image.filePath)
        );
        if (fs.existsSync(absoluteFilePath)) {
          try {
            fs.unlinkSync(absoluteFilePath); // Supprime le fichier du disque
            console.log(`Deleted file: ${absoluteFilePath}`);
          } catch (err) {
            console.error(`Failed to delete file: ${absoluteFilePath}`, err);
          }
        } else {
          console.warn(`File not found: ${absoluteFilePath}`);
        }

        // Supprimer l'image de MongoDB
        await Image.deleteOne({ _id: image._id });
      }

      // Sauvegarde des nouvelles images
      for (const file of newImages) {
        console.log("lol");
        const relativePath = `/images/${path.basename(file.path)}`; // Chemin relatif pour la base de données
        const newFilePath = path.join(imageDir, path.basename(file.path)); // Chemin absolu du fichier sur le disque

        // Déplacer le fichier temporaire vers le dossier public/images
        fs.renameSync(file.path, newFilePath);

        const newImage = new Image({
          filePath: relativePath,
          category: categoryId,
        });

        await newImage.save(); // Sauvegarde dans la base de données
      }
    }

    res
      .status(200)
      .send({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send({ message: "Error updating category", error });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    // Trouver la catégorie par ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Trouver toutes les images associées à la catégorie
    const images = await Image.find({ category: categoryId });

    // Supprimer les fichiers d'images du disque
    for (const image of images) {
      const filePath = path.normalize(path.join(image.filePath));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Supprime le fichier image du disque
      }
    }

    // Supprimer les images associées de la base de données
    await Image.deleteMany({ category: categoryId });

    // Supprimer la catégorie de la base de données
    await Category.findByIdAndDelete(categoryId);

    res
      .status(200)
      .send({ message: "Category and associated images deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting category and images" });
  }
};

export {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
