import { Request, Response } from "express";
import { TransactionTypeModel } from "../models/transaction.model.ts";

export const createTransactionType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const transactionType = await TransactionTypeModel.create({ name });
    res.status(201).json({
      success: true,
      data: transactionType,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllTransactionTypes = async (_req: Request, res: Response) => {
  try {
    const transactionTypes = await TransactionTypeModel.find();
    res.status(200).json({
      success: true,
      data: transactionTypes,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTransactionType = async (req: Request, res: Response) => {
  try {
    const transactionType = await TransactionTypeModel.findById(req.params.id);
    if (!transactionType) {
      return res.status(404).json({
        success: false,
        error: "Transaction type not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transactionType,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateTransactionType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const transactionType = await TransactionTypeModel.findByIdAndUpdate(
      req.params.id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!transactionType) {
      return res.status(404).json({
        success: false,
        error: "Transaction type not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transactionType,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteTransactionType = async (req: Request, res: Response) => {
  try {
    const transactionType = await TransactionTypeModel.findByIdAndDelete(
      req.params.id
    );
    if (!transactionType) {
      return res.status(404).json({
        success: false,
        error: "Transaction type not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
