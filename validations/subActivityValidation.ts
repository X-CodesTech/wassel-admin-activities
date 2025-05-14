import { handleValidation } from "../helpers/validationHelper.ts";
import { body, param } from "express-validator";
import { type RequestHandler } from "express";

export const idParamValidator: RequestHandler[] = [
  param("id").isMongoId().withMessage("Invalid sub-activity ID"),
  handleValidation,
];

export const activityParamValidator: RequestHandler[] = [
  param("activityId")
    .exists()
    .withMessage("activityId parameter is required")
    .bail()
    .isMongoId()
    .withMessage("activityId must be a valid Mongo ID"),
  handleValidation,
];

export const createSubActivityValidator: RequestHandler[] = [
  body("transactionType")
    .notEmpty()
    .withMessage("transactionType is required")
    .bail()
    .isMongoId()
    .withMessage("transactionType must be a valid Mongo ID"),
  body("activity")
    .notEmpty()
    .withMessage("activity is required")
    .bail()
    .isMongoId()
    .withMessage("activity must be a valid Mongo ID"),
  body("pricingMethod")
    .notEmpty()
    .withMessage("pricingMethod is required")
    .bail()
    .isIn(["manual", "fixed", "perItem", "perLocation"])
    .withMessage("Invalid pricing method"),
  body("portalItemNameEn")
    .notEmpty()
    .withMessage("portalItemNameEn is required")
    .trim(),
  body("portalItemNameAr")
    .notEmpty()
    .withMessage("portalItemNameAr is required")
    .trim(),
  body("isActive")
    .exists()
    .withMessage("isActive is required")
    .bail()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  handleValidation,
];

export const updateSubActivityValidator: RequestHandler[] = [
  body().custom((_, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error("Must supply at least one field to update");
    }
    return true;
  }),
  param("id").isMongoId().withMessage("Invalid sub-activity ID"),
  body("transactionType")
    .optional()
    .isMongoId()
    .withMessage("transactionType must be a valid Mongo ID"),
  body("activity")
    .optional()
    .isMongoId()
    .withMessage("activity must be a valid Mongo ID"),
  body("pricingMethod")
    .optional()
    .isIn(["manual", "fixed", "perItem", "perLocation"])
    .withMessage("Invalid pricing method"),
  body("portalItemNameEn")
    .optional()
    .notEmpty()
    .withMessage("portalItemNameEn cannot be empty")
    .trim(),
  body("portalItemNameAr")
    .optional()
    .notEmpty()
    .withMessage("portalItemNameAr cannot be empty")
    .trim(),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  handleValidation,
];
