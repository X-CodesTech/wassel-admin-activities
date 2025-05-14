// src/middleware/handleValidation.ts
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const handleValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};
