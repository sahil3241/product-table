import Transaction from "../models/transaction.js";

const getMonthFromDate = (date) => {
  const d = new Date(date);
  return d.getMonth() + 1;
};

export const getBarChartData = async (month) => {
  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901+", min: 901, max: Infinity },
  ];

  const data = [];

  const transactions = await Transaction.find();

  const filteredTransactions = transactions.filter((transaction) => {
    return getMonthFromDate(transaction.dateOfSale) === Number(month);
  });

  for (let range of priceRanges) {
    const count = filteredTransactions.filter((transaction) => {
      return transaction.price >= range.min && transaction.price <= range.max;
    }).length;

    data.push({ range: range.range, count });
  }

  return data;
};

export const getPieChartData = async (month) => {
  const transactions = await Transaction.find();

  const filteredTransactions = transactions.filter((transaction) => {
    return getMonthFromDate(transaction.dateOfSale) === Number(month);
  });

  const categories = filteredTransactions.reduce((acc, transaction) => {
    const category = transaction.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categories).map(([category, count]) => ({
    category,
    count,
  }));
};
