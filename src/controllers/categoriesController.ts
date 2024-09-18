import Category from "../models/categoryModel";
import { Request, Response } from "express";
import Image from "../models/ImageModel";
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
    const category = await Category.findById(req.params.id);
    res.status(200).send(category);
  } catch (error) {
    res.status;
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(category);
  } catch (error) {
    res.status;
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status;
  }
};

export {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
