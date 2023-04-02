import { Router } from "express";
import {
  createPropertieController,
  listPropertieController,
} from "../Controllers/properties.schedules.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";

const propertiesRouter = Router();

propertiesRouter.get(`/properties`, listPropertieController);
propertiesRouter.post(
  `/properties`,
  ensureAuthMiddleware,
  createPropertieController
);

export default propertiesRouter;
