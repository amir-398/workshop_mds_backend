import Category from "../models/categoryModel";
import { Request, Response } from "express";
import Image from "../models/ImageModel";
import fs from "fs";
import path from "path";
const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, price, discount_price } = req.body;

    if (!name || !price || !discount_price || !req.files) {
      return res.status(400).send({ message: "field required" });
    }
    // Créer une nouvelle catégorie
    const category = new Category({
      name: req.body.name,
      price: req.body.price,
      discount_price: req.body.discount_price,
    });

    await category.save();
    // Si des fichiers ont été uploadés, les sauvegarder
    if (req.files && Array.isArray(req.files)) {
      const images = req.files as Express.Multer.File[];
      for (const file of images) {
        const newImage = new Image({
          filePath: file.path, // Chemin de l'image sur le disque
          category: category._id,
        });
        await newImage.save(); // Sauvegarde dans la base de données
      }
    } else if (req.files && req.files["images"]) {
      const images = req.files["images"] as Express.Multer.File[];
      for (const file of images) {
        const newImage = new Image({
          filePath: file.path, // Chemin de l'image sur le disque
          category: category._id,
        });
        await newImage.save(); // Sauvegarde dans la base de donnée
      }
    }

    res.status(201).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding category" });
  }
};

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

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { name, price, discount_price } = req.body;

    // Trouver la catégorie par ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Mise à jour des champs de la catégorie
    category.name = name || category.name;
    category.price = price || category.price;
    category.discount_price = discount_price || category.discount_price;

    // Sauvegarder la catégorie mise à jour
    await category.save();

    // Gestion des images associées à la catégorie
    if (req.files && Array.isArray(req.files)) {
      const newImages = req.files as Express.Multer.File[];

      // Suppression des anciennes images (si elles doivent être remplacées)
      const existingImages = await Image.find({ category: categoryId });

      // Supprimer les fichiers sur le disque et supprimer les documents dans MongoDB
      for (const image of existingImages) {
        const filePath = path.join(__dirname, "../", image.filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Supprime le fichier image du disque
        }
        await Image.deleteOne({ _id: image._id }); // Supprimer l'image de MongoDB
      }

      // Ajouter de nouvelles images
      for (const file of newImages) {
        const newImage = new Image({
          filePath: file.path, // Chemin de l'image sur le disque
          category: categoryId, // Lier l'image à la catégorie
        });
        await newImage.save(); // Sauvegarder la nouvelle image dans MongoDB
      }
    }

    res
      .status(200)
      .send({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating category" });
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
