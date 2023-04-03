import { Request, Response } from "express";
import {
  createContactService,
  listContactService,
} from "../Services/contacts.services";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const newCategory = await createContactService(request);
  return response.status(201).json(newCategory);
};

export const listContactController = async (
  request: Request,
  response: Response
) => {
  const categories = await listContactService(request);
  return response.status(200).json(categories);
};

// export const listPropertiesOfCategorieController = async (
//   request: Request,
//   response: Response
// ) => {
//   const categorie = await listPropertiesOfCategorieService(request);
//   return response.status(200).json(categorie);
// };
