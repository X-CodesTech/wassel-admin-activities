import { type RequestHandler } from "express";
import { body, param } from "express-validator";
import { handleValidation } from "../helpers/validationHelper.ts";

export const idParamValidator: RequestHandler[] = [
  param("id").isMongoId().withMessage("Invalid activity ID"),
  handleValidation,
];

export const createActivityValidator: RequestHandler[] = [
  body("actSrl").notEmpty().withMessage("actSrl is required"),
  body("activityTransactionType")
    .exists()
    .withMessage("transaction type is required")
    .isMongoId()
    .withMessage("must be a valid TransactionType ID"),
  body("activityNameEn").notEmpty().withMessage("activityNameEn is required"),
  body("activityNameAr").notEmpty().withMessage("activityNameAr is required"),
  body("activityCode").notEmpty().withMessage("activityCode is required"),
  body("portalActivityNameEn")
    .notEmpty()
    .withMessage("portalActivityNameEn is required"),
  body("portalActivityNameAr")
    .notEmpty()
    .withMessage("portalActivityNameAr is required"),
  body("isWithItems").isBoolean().withMessage("isWithItems must be a boolean"),
  body("financeEffect")
    .isBoolean()
    .withMessage("financeEffect must be a boolean"),
  body("sign").isBoolean().withMessage("sign must be a boolean"),
  body("isOpsActive").isBoolean().withMessage("isOpsActive must be a boolean"),
  body("isPortalActive")
    .isBoolean()
    .withMessage("isPortalActive must be a boolean"),
  body("isInOrderScreen")
    .isBoolean()
    .withMessage("isInOrderScreen must be a boolean"),
  body("isActive").isBoolean().withMessage("isActive must be a boolean"),
  handleValidation,
];

export const updateActivityValidator: RequestHandler[] = [
  body().custom((_, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error("Must supply at least one field to update");
    }
    return true;
  }),
  param("id").isMongoId().withMessage("Invalid activity ID"),
  body("actSrl").optional().notEmpty().withMessage("actSrl cannot be empty"),
  body("activityTransactionType")
    .optional()
    .notEmpty()
    .withMessage("activityTransactionType cannot be empty"),
  body("activityNameEn")
    .optional()
    .notEmpty()
    .withMessage("activityNameEn cannot be empty"),
  body("activityNameAr")
    .optional()
    .notEmpty()
    .withMessage("activityNameAr cannot be empty"),
  body("activityCode")
    .optional()
    .notEmpty()
    .withMessage("activityCode cannot be empty"),
  body("portalActivityNameEn")
    .optional()
    .notEmpty()
    .withMessage("portalActivityNameEn cannot be empty"),
  body("portalActivityNameAr")
    .optional()
    .notEmpty()
    .withMessage("portalActivityNameAr cannot be empty"),
  body("isWithItems")
    .optional()
    .isBoolean()
    .withMessage("isWithItems must be a boolean"),
  body("financeEffect")
    .optional()
    .isBoolean()
    .withMessage("financeEffect must be a boolean"),
  body("sign").optional().isBoolean().withMessage("sign must be a boolean"),
  body("isOpsActive")
    .optional()
    .isBoolean()
    .withMessage("isOpsActive must be a boolean"),
  body("isPortalActive")
    .optional()
    .isBoolean()
    .withMessage("isPortalActive must be a boolean"),
  body("isInOrderScreen")
    .optional()
    .isBoolean()
    .withMessage("isInOrderScreen must be a boolean"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  handleValidation,
];
