import AppDataSource from "../data-source";
import { AppError } from "../Errors/error";
import { Request } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import { Categorie } from "../Entities/categories.entity";

export const createCategoryService = async (
  categoryData: Request
): Promise<Categorie[]> => {
  const categorieRepository = AppDataSource.getRepository(Categorie);
  const categorieExist = await categorieRepository.findOneBy({
    name: categoryData.body.name,
  });

  if (!categoryData.user.type) {
    throw new AppError("Permission denied", 403);
  }

  if (categorieExist) {
    throw new AppError("categorie alredy exist", 409);
  }

  const createdCategorie = categorieRepository.create(categoryData.body);

  await categorieRepository.save(createdCategorie);

  return createdCategorie;
};

export const listCategoryService = async (
  request: Request
): Promise<ICategoryRequest[]> => {
  const categorieRepository = AppDataSource.getRepository(Categorie);

  const categories = await categorieRepository.find();

  return categories;
};

export const listPropertiesOfCategorieService = async (
  request: Request
): Promise<Categorie> => {
  const categorieRepository = AppDataSource.getRepository(Categorie);

  const findCategorie = await categorieRepository.findOne({
    where: { id: request.params.id },
    relations: { properties: true },
  });

  if (!findCategorie) {
    throw new AppError("categorie not found", 404);
  }

  return findCategorie;
};
