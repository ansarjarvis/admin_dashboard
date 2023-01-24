import mongoose from "mongoose";

let TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

let Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
