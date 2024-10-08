import Transaction from "../models/transaction.js";

const getMonthFromDate = (date) => {
  const d = new Date(date);
  return d.getMonth() + 1;
};

export const getTransactions = async (page, perPage, search, month) => {
  try {
    const query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { description: regex }];

      const price = parseFloat(search);
      if (!isNaN(price)) {
        query.$or.push({ price: price });
      }
    }

    let transactions = await Transaction.find(query).exec();

    if (month) {
      transactions = transactions.filter((transaction) => {
        return getMonthFromDate(transaction.dateOfSale) === Number(month);
      });
    }

    const total = transactions.length;
    const paginatedTransactions = transactions.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return {
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      transactions: paginatedTransactions,
    };
  } catch (error) {
    throw new Error("Error fetching transactions: " + error.message);
  }
};

export const clearDatabase = async () => {
  try {
    await Transaction.deleteMany({});
  } catch (error) {
    throw new Error("Error clearing database: " + error.message);
  }
};

export const insertTransactions = async (transactions) => {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid input: transactions must be an array");
  }

  try {
    await Transaction.insertMany(transactions);
  } catch (error) {
    throw new Error("Error inserting transactions: " + error.message);
  }
};
