import { Router } from "express";
import {
  createActivity,
  deleteActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} from "../controllers/activityController.ts";
import {
  createActivityValidator,
  idParamValidator,
  updateActivityValidator,
} from "../validations/activitiesValidation.ts";

const router = Router();

router.get("/", getAllActivities);
router.get("/:id", idParamValidator, getActivityById);
router.post("/", createActivityValidator, createActivity);
router.put("/:id", updateActivityValidator, updateActivity);
router.delete("/:id", idParamValidator, deleteActivity);

export default router;
