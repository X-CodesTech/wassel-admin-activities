import { Schema, model, Types, InferSchemaType } from "mongoose";

const ActivitySchema = new Schema(
  {
    actSrl: { type: String, required: true, unique: true },
    activityTransactionType: {
      type: Types.ObjectId,
      ref: "TransactionType",
      required: true,
    },
    activityNameEn: { type: String, required: true },
    activityNameAr: { type: String, required: true },
    activityCode: { type: String, required: true },
    portalActivityNameEn: { type: String, required: true },
    portalActivityNameAr: { type: String, required: true },
    isWithItems: { type: Boolean, default: false, required: true },
    financeEffect: { type: Boolean, default: false, required: true },
    sign: { type: Boolean, default: false, required: true },
    isOpsActive: { type: Boolean, default: false, required: true },
    isPortalActive: { type: Boolean, default: false, required: true },
    isInOrderScreen: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ActivitySchema.virtual("subActivities", {
  ref: "SubActivity",
  localField: "_id",
  foreignField: "parentId",
});

export type Activity = InferSchemaType<typeof ActivitySchema>;
export const ActivityModel = model<Activity>("Activity", ActivitySchema);
