import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const getTransactions = async (month, page = 1, searchQuery = "") => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    params: { month, page, search: searchQuery, perPage: 3 },
  });

  const { transactions, total } = response.data;

  return {
    transactions,
    totalPages: Math.ceil(total / 3),
  };
};

export const getStatistics = async (month) => {
  const response = await axios.get(`${BASE_URL}/statistics?month=${month}`);
  return response.data;
};

export const getPriceRange = async (month) => {
  const response = await axios.get(`${BASE_URL}/charts/bar?month=${month}`);
  return response.data;
};
