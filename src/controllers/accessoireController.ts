import Accessoire from "../models/accessoireModel";
import { Request, Response } from "express";
import Image from "../models/ImageModel";
import path from "path";
import fs from "fs";
const addAccessoire = async (req: Request, res: Response) => {
  try {
    const { category_id, name, price, color } = req.body;
    if (!category_id || !name || !price || !color) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    const accessoire = new Accessoire({
      category_id: category_id,
      name: name,
      price: price,
      color: color,
    });
    await accessoire.save();

    // Si des fichiers ont été uploadés, les sauvegarder
    if (req.files && Array.isArray(req.files)) {
      const images = req.files as Express.Multer.File[];
      for (const file of images) {
        const newImage = new Image({
          filePath: file.path, // Chemin de l'image sur le disque
          accessoire: accessoire._id,
        });
        await newImage.save(); // Sauvegarde dans la base de données
      }
    } else if (req.files && req.files["images"]) {
      const images = req.files["images"] as Express.Multer.File[];
      for (const file of images) {
        const newImage = new Image({
          filePath: file.path, // Chemin de l'image sur le disque
          accessoire: accessoire._id,
        });
        await newImage.save(); // Sauvegarde dans la base de donnée
      }
    }
    res.status(201).send(accessoire);
  } catch (error) {
    res.status(500).send({ message: "Error adding accessoire", error });
  }
};

const getAccessoires = async (req: Request, res: Response) => {
  try {
    const accessoires = await Accessoire.find().populate({
      path: "images", // Le chemin pour peupler les images liées à chaque catégorie
      model: Image, // Le modèle lié (ici Image)
    });
    res.status(200).send(accessoires);
  } catch (error) {
    res.status(500).send({ message: "Error fetching accessoires with images" });
  }
};

const getAccessoire = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const accessoire = await Accessoire.findById(id).populate({
      path: "images", // Le chemin pour peupler les images liées à chaque catégorie
      model: Image, // Le modèle lié (ici Image)
    });
    if (!accessoire) {
      return res.status(404).send({ message: "Accessoire not found" });
    }
    res.status(200).send(accessoire);
  } catch (error) {
    res.status(500).send({ message: "Error fetching accessoire with images" });
  }
};

const getAccessoiresByCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.params;

    const accessoires = await Accessoire.find({
      category_id: category_id,
    }).populate({
      path: "images", // Le chemin pour peupler les images liées à chaque catégorie
      model: Image, // Le modèle lié (ici Image)
    });
    if (!accessoires) {
      return res.status(404).send({ message: "Accessoire not found" });
    }
    res.status(200).send(accessoires);
  } catch (error) {
    res.status(500).send({ message: "Error fetching accessoire with images" });
  }
};

const deleteAccessoire = async (req: Request, res: Response) => {
  try {
    const accessoireId = req.params.id;

    // Trouver la catégorie par ID
    const accessoire = await Accessoire.findById(accessoireId);
    if (!accessoire) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Trouver toutes les images associées à la catégorie
    const images = await Image.find({ accessoire: accessoireId });

    // Supprimer les fichiers d'images du disque
    for (const image of images) {
      const filePath = path.normalize(path.join(image.filePath));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Supprime le fichier image du disque
      }
    }

    // Supprimer les images associées de la base de données
    await Image.deleteMany({ accessoire: accessoireId });

    // Supprimer la catégorie de la base de données
    await Accessoire.findByIdAndDelete(accessoireId);

    res
      .status(200)
      .send({ message: "Category and associated images deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting category and images" });
  }
};

export {
  addAccessoire,
  getAccessoires,
  getAccessoire,
  deleteAccessoire,
  getAccessoiresByCategory,
};
