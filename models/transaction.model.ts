import { Schema, model, InferSchemaType } from "mongoose";

const TransactionTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export type TransactionType = InferSchemaType<typeof TransactionTypeSchema>;
export const TransactionTypeModel = model<TransactionType>(
  "TransactionType",
  TransactionTypeSchema
);
