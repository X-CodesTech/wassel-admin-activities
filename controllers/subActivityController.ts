// src/controllers/subActivityController.ts
import { Request, Response } from "express";
import { Types, Error as MongooseError } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { SubActivityModel } from "../models/subActivity.model.ts";
import { ActivityModel } from "../models/activity.model.ts";

export async function getSubActivityById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid sub-activity ID" });
    return;
  }

  try {
    const doc = await SubActivityModel.findById(id)
      .populate("transactionType")
      .populate("activity")
      .lean();
    if (!doc) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sub-activity not found" });
      return;
    }

    res.status(StatusCodes.OK).json(doc);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}

export async function createSubActivity(
  req: Request,
  res: Response
): Promise<void> {
  const {
    transactionType,
    activity,
    pricingMethod,
    portalItemNameEn,
    portalItemNameAr,
    isActive,
  } = req.body;

  if (!transactionType || !Types.ObjectId.isValid(transactionType)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing or invalid transactionType" });
    return;
  }

  if (!activity || !Types.ObjectId.isValid(activity)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing or invalid activity" });
    return;
  }

  if (
    !pricingMethod ||
    !portalItemNameEn ||
    !portalItemNameAr ||
    isActive === undefined
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Missing required fields",
    });
    return;
  }

  try {
    const activityExists = await ActivityModel.exists({ _id: activity });
    if (!activityExists) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Activity not found" });
      return;
    }

    const created = await SubActivityModel.create({
      transactionType,
      activity,
      pricingMethod,
      portalItemNameEn,
      portalItemNameAr,
      isActive,
    });

    res.status(StatusCodes.CREATED).json(created.toObject({ virtuals: true }));
    return;
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation error", errors: err.errors });
      return;
    }
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    return;
  }
}

export async function updateSubActivity(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid sub-activity ID" });
    return;
  }

  try {
    const exists = await SubActivityModel.exists({ _id: id });
    if (!exists) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sub-activity not found" });
      return;
    }

    const updateData = { ...req.body } as Partial<{
      transactionType: string;
      activity: string;
      pricingMethod: string;
      portalItemNameEn: string;
      portalItemNameAr: string;
      isActive: boolean;
    }>;

    if (
      updateData.transactionType &&
      !Types.ObjectId.isValid(updateData.transactionType)
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid transaction type ID" });
      return;
    }

    if (updateData.activity && !Types.ObjectId.isValid(updateData.activity)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid activity ID" });
      return;
    }

    if (updateData.activity) {
      const activityExists = await ActivityModel.exists({
        _id: updateData.activity,
      });
      if (!activityExists) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Activity not found" });
        return;
      }
    }

    const updated = await SubActivityModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sub-activity not found after update" });
      return;
    }

    res.status(StatusCodes.OK).json(updated);
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation error", errors: err.errors });
      return;
    }
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}

export async function deleteSubActivity(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid sub-activity ID" });
    return;
  }

  try {
    const existing = await SubActivityModel.exists({ _id: id });
    if (!existing) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sub-activity not found" });
      return;
    }
    await SubActivityModel.findByIdAndDelete(id);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
}

export async function getSubActivitiesByActivity(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { activityId } = req.params;

    const subActivities = await SubActivityModel.find({ activity: activityId })
      .select(
        "portalItemNameEn portalItemNameAr pricingMethod isActive transactionType createdAt updatedAt"
      )
      .populate("transactionType", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.status(StatusCodes.OK).json({
      success: true,
      data: subActivities,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
}
