import { Router } from "express";
import {
  createScheduleController,
  listScheduleController,
} from "../Controllers/schedules.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";

const schedulesRouter = Router();

schedulesRouter.post(
  `/schedules`,
  ensureAuthMiddleware,
  createScheduleController
);
schedulesRouter.get(
  `/schedules/properties/:id`,
  ensureAuthMiddleware,
  listScheduleController
);

export default schedulesRouter;
