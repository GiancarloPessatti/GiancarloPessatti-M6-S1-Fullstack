import { Router } from "express";
import {
  createCategoriesController,
  listCategoriesController,
  listPropertiesOfCategorieController,
} from "../Controllers/categories.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import createCategoryShape from "../Serials/createCategory.serial";

const categorieRouter = Router();

categorieRouter.get(`/categories`, listCategoriesController);
categorieRouter.post(
  `/categories`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(createCategoryShape),
  createCategoriesController
);
categorieRouter.get(
  `/categories/:id/properties`,
  listPropertiesOfCategorieController
);

export default categorieRouter;
