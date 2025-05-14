import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ActivityModel } from "../models/activity.model.ts";
import { Types, Error as MongooseError } from "mongoose";
import { SubActivityModel } from "../models/subActivity.model.ts";

export const getAllActivities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const activities = await ActivityModel.find().lean();
    res.status(StatusCodes.OK).json(activities);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export const getActivityById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid activity ID" });
      return;
    }

    const activity = await ActivityModel.findById(id)
      .populate("subActivities")
      .lean({ virtuals: true });

    if (!activity) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Activity not found" });
      return;
    }

    res.status(StatusCodes.OK).json(activity);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export const createActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      actSrl,
      activityTransactionType,
      activityNameEn,
      activityNameAr,
      activityCode,
      portalActivityNameEn,
      portalActivityNameAr,
      isWithItems,
      financeEffect,
      sign,
      isOpsActive,
      isPortalActive,
      isInOrderScreen,
      isActive,
    } = req.body;

    if (
      !actSrl ||
      !activityTransactionType ||
      !activityNameEn ||
      !activityNameAr ||
      !activityCode ||
      !portalActivityNameEn ||
      !portalActivityNameAr ||
      isWithItems === undefined ||
      financeEffect === undefined ||
      sign === undefined ||
      isOpsActive === undefined ||
      isPortalActive === undefined ||
      isInOrderScreen === undefined ||
      isActive === undefined
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "All fields are required: actSrl, activityCode, activityType, activityName, isWithItems, financeEffect, active",
      });
      return;
    }

    const existing = await ActivityModel.findOne({ actSrl }).lean();
    if (existing) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Activity with this actSrl already exists" });
      return;
    }

    const created = await ActivityModel.create({
      actSrl,
      activityTransactionType,
      activityNameEn,
      activityNameAr,
      activityCode,
      portalActivityNameEn,
      portalActivityNameAr,
      isWithItems,
      financeEffect,
      sign,
      isOpsActive,
      isPortalActive,
      isInOrderScreen,
      isActive,
    });

    res.status(StatusCodes.CREATED).json(created.toObject({ virtuals: true }));
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export const updateActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid activity ID" });
      return;
    }

    const existing = await ActivityModel.findById(id).lean();
    if (!existing) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Activity not found" });
      return;
    }

    const updateData = { ...req.body } as Partial<{
      actSrl: string;
      activityTransactionType: string;
      activityNameEn: string;
      activityNameAr: string;
      activityCode: string;
      portalActivityNameEn: string;
      portalActivityNameAr: string;
      isWithItems: boolean;
      financeEffect: boolean;
      sign: boolean;
      isOpsActive: boolean;
      isPortalActive: boolean;
      isInOrderScreen: boolean;
      isActive: boolean;
    }>;

    if (updateData.actSrl && updateData.actSrl !== existing.actSrl) {
      const conflict = await ActivityModel.findOne({
        actSrl: updateData.actSrl,
      }).lean();
      if (conflict && conflict._id.toString() !== id) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Activity with this actSrl already exists" });
        return;
      }
    }

    const updated = await ActivityModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("subActivities")
      .lean({ virtuals: true });

    if (!updated) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Activity not found after update" });
      return;
    }

    res.status(StatusCodes.OK).json(updated);
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation error", errors: err.errors });
    } else {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
};

export const deleteActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid activity ID" });
      return;
    }

    const activity = await ActivityModel.findById(id).lean();
    if (!activity) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Activity not found" });
      return;
    }

    const deleted = await ActivityModel.findByIdAndDelete(id);
    if (!deleted) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to delete activity" });
      return;
    }

    await SubActivityModel.deleteMany({ parentId: id });

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};
