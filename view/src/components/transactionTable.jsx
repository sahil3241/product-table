import React, { useState, useEffect } from "react";
import { getTransactions, getStatistics, getPriceRange } from "../api/api";
import PriceRangeChart from "./priceRangeChart";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(3); 
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  const [priceRangeData, setPriceRangeData] = useState([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions(month, page, searchQuery);
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const stats = await getStatistics(month);
      setStatistics(stats);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };
  const fetchPriceRangeData = async () => {
    try {
      const data = await getPriceRange(month);
    console.log(data);
    setPriceRangeData(data);
    } catch (error) {
      console.error("Error fetching price range data", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchPriceRangeData();
  }, [month, page, searchQuery]);

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
    <h1 className="text-5xl font-semibold m-6 flex justify-center items-center font-mono text-center">Transaction Dashboard</h1>
    <div className="flex flex-col  justify-center items-center text-center">
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 md:w-[20%] w-[60%] mt-6">
          <h2 className="md:text-3xl text-2xl font-semibold font-serif">Statistics for {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1]}</h2>
          <p className="font-mono md:text-md text-sm"><strong>Total Sales:</strong> ${statistics.totalSales.toFixed(2)}</p>
          <p className="font-mono md:text-md text-sm"><strong>Total Sold Items:</strong> {statistics.totalSoldItems}</p>
          <p className="font-mono md:text-md text-sm"><strong>Total Unsold Items:</strong> {statistics.totalUnsoldItems}</p>
        </div>
        </div>
    <div className="max-w-5xl mx-auto p-6">
    
      
      <div className="flex md:justify-between max-md:gap-2">
      <div className="mb-4 flex items-center">
        <div className="p-2 bg-white rounded-lg">
        <label className="text-lg mr-4">Select Month:</label>
        
        <select
          className="border border-gray-300 rounded md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={month}
          onChange={handleMonthChange}
        >
          {[
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ].map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
        </div>
      </div>
      
      <div className="mb-4 flex items-center space-x-4">
        <div className="p-3 bg-white rounded-lg">
        <input
          type="text"
          className="border border-gray-300 rounded md:px-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search transactions"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="bg-red-500 text-white md:px-4 md:py-2  rounded hover:bg-red-600"
          onClick={clearSearch}
        >
          Clear Search
        </button>
      </div>
      </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="table-auto md:w-full w-[50%] border-collapse border border-gray-200 shadow-lg rounded-lg mb-6 min-h-14">
          <thead className="bg-white">
            <tr>
            <th className="border px-4 py-2 text-center font-serif">Id</th>
              <th className="border px-4 py-2 text-center font-serif">Title</th>
              <th className="border px-4 py-2 text-center font-serif">Description</th>
              <th className="border px-4 py-2 text-center font-serif">Price</th>
              <th className="border px-4 py-2 text-center font-serif">Date of Sale</th>
              <th className="border px-4 py-2 text-center font-serif">Category</th>
              <th className="border px-4 py-2 text-center font-serif">Sold</th>
              <th className="border px-4 py-2 text-center font-serif">Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-mono max-md:text-xs">{transaction.id}</td>
                  <td className="border px-4 py-2 font-mono max-md:text-xs">{transaction.title}</td>
                  <td className="border px-4 py-2 font-mono max-md:text-xs">{transaction.description}</td>
                  <td className="border px-4 py-2 font-mono max-md:text-xs">{transaction.price}</td>
                  <td className="border px-4 py-2 font-mono max-md:text-xs">
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 font-mono text-center max-md:text-xs">{transaction.category}</td>
                  <td className="border px-4 py-2 font-mono max-md:text-xs">{transaction.sold ? "Sold" : "Available"}</td>
                  <td className="border px-4 py-2"><img src={transaction.image} alt="img" /></td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    <div className="flex justify-center mt-16">
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 w-[65%]">
          <h2 className="text-xl font-semibold font-mono">Price Range Chart for {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1]}</h2>
          <PriceRangeChart data={priceRangeData} />
        </div>
        </div>
    </>
  );
};

export default Transactions;
