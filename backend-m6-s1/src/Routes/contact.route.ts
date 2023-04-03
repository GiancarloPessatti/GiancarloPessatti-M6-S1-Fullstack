import { Router } from "express";
import {
  createContactController,
  listContactController,
} from "../Controllers/contacts.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import createCategoryShape from "../Serials/patchContact.serial";
import createContactShape from "../Serials/patchContact.serial";

const contactRouter = Router();

contactRouter.get(`/api/contacts`, listContactController);
contactRouter.post(
  `/api/contacts/user`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(createContactShape),
  createContactController
);
contactRouter.patch(
  `/api/contact/:id`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(createContactShape),
  createContactController
);
contactRouter.delete(`/api/contact/:id`, createContactController);

export default contactRouter;
