import { Request, Response } from "express";
import {
  createCategoryService,
  listCategoryService,
  listPropertiesOfCategorieService,
} from "../Services/categories.services";

export const createCategoriesController = async (
  request: Request,
  response: Response
) => {
  const newCategory = await createCategoryService(request);
  return response.status(201).json(newCategory);
};

export const listCategoriesController = async (
  request: Request,
  response: Response
) => {
  const categories = await listCategoryService(request);
  return response.status(200).json(categories);
};

export const listPropertiesOfCategorieController = async (
  request: Request,
  response: Response
) => {
  const categorie = await listPropertiesOfCategorieService(request);
  return response.status(200).json(categorie);
};
