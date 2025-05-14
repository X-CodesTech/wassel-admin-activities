import { body, param } from "express-validator";

export const nameValidation = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ min: 2, max: 50 })
  .withMessage("Name must be between 2 and 50 characters");

export const idValidation = param("id")
  .notEmpty()
  .withMessage("ID is required")
  .isMongoId()
  .withMessage("Invalid ID format");

export const updateTransactionTypeValidation = [idValidation, nameValidation];
