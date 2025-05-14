import { Router } from "express";
import {
  createSubActivity,
  deleteSubActivity,
  getSubActivityById,
  updateSubActivity,
  getSubActivitiesByActivity,
} from "../controllers/subActivityController.ts";
import {
  createSubActivityValidator,
  updateSubActivityValidator,
  idParamValidator,
  activityParamValidator,
} from "../validations/subActivityValidation.ts";

const router = Router();

router.get("/:id", idParamValidator, getSubActivityById);
router.post("/", createSubActivityValidator, createSubActivity);
router.put("/:id", updateSubActivityValidator, updateSubActivity);
router.delete("/:id", idParamValidator, deleteSubActivity);
router.get(
  "/sub-activities/by-activity/:activityId",
  activityParamValidator,
  getSubActivitiesByActivity
);

export default router;
