import Category from "../models/categoryModel";
import { Request, Response } from "express";
const addCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status;
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status;
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
