import * as transactionService from "../services/transactionService.js";
import Transaction from "../models/transaction.js";
import axios from "axios";

export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 3, search = "", month } = req.query;
    const { transactions, total } = await transactionService.getTransactions(
      page,
      perPage,
      search,
      month
    );

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const initializeDatabase = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    await transactionService.clearDatabase();

    const transactions = data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      dateOfSale: new Date(item.dateOfSale),
      sold: item.sold,
    }));

    await transactionService.insertTransactions(transactions);
    console.log("Database initialized successfully with seed data");
  } catch (error) {
    console.error("Error initializing database:", error.message);
  }
};

export const checkDatabaseStatus = async (req, res) => {
  console.log("Checking database status...");
  try {
    const count = await Transaction.countDocuments();
    res.status(200).json({
      message: "Database check successful",
      transactionCount: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking database status",
      error: error.message,
    });
  }
};
