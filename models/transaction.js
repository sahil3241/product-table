import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
