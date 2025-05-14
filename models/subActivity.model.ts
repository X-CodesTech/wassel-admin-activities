import { Schema, model, Types, InferSchemaType } from "mongoose";

const SubActivitySchema = new Schema(
  {
    transactionType: {
      type: Types.ObjectId,
      ref: "TransactionType",
      required: true,
    },
    activity: {
      type: Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    pricingMethod: {
      type: String,
      required: true,
      enum: ["manual", "fixed", "perItem", "perLocation"],
    },
    portalItemNameEn: {
      type: String,
      required: true,
      trim: true,
    },
    portalItemNameAr: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export type SubActivity = InferSchemaType<typeof SubActivitySchema>;
export const SubActivityModel = model<SubActivity>(
  "SubActivity",
  SubActivitySchema
);
