import express from "express";
import {
  createTransactionType,
  getAllTransactionTypes,
  getTransactionType,
  updateTransactionType,
  deleteTransactionType,
} from "../controllers/transactionType.controller.ts";
import {
  idValidation,
  nameValidation,
  updateTransactionTypeValidation,
} from "../validations/transactionTypesValidation.ts";
import { handleValidation } from "../helpers/validationHelper.ts";

const router = express.Router();

router.post("/", [nameValidation], handleValidation, createTransactionType);

router.get("/", getAllTransactionTypes);

router.get("/:id", [idValidation], handleValidation, getTransactionType);

router.put(
  "/:id",
  ...updateTransactionTypeValidation,
  handleValidation,
  updateTransactionType
);

router.delete("/:id", idValidation, handleValidation, deleteTransactionType);

export default router;
