import Transaction from "../models/transaction.js";

const getMonthFromDate = (date) => {
  const d = new Date(date);
  return d.getMonth() + 1;
};

export const getStatisticsForMonth = async (month) => {
  try {
    const transactions = await Transaction.find();

    let totalSales = 0;
    let totalSoldItems = 0;
    let totalUnsoldItems = 0;

    transactions.forEach((transaction) => {
      const transactionMonth = getMonthFromDate(transaction.dateOfSale);
      if (transactionMonth === parseInt(month)) {
        if (transaction.sold) {
          totalSales += transaction.price;
          totalSoldItems += 1;
        } else {
          totalUnsoldItems += 1;
        }
      }
    });

    return {
      totalSales,
      totalSoldItems,
      totalUnsoldItems,
    };
  } catch (error) {
    throw new Error("Error fetching statistics for the selected month");
  }
};
