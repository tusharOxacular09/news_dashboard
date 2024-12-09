"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  // State variables to hold the payout amount, total payout, and the list of articles
  const [payoutPerArticle, setPayoutPerArticle] = useState<number>(0);
  const [totalPayout, setTotalPayout] = useState<number>(0);
  const [articles, setArticles] = useState<Array<any>>([]); // Replace 'any' with your Article type

  // Effect to load the stored payout and articles from localStorage when the component mounts
  useEffect(() => {
    // Retrieve payoutPerArticle from localStorage and set it in the state if it exists
    const storedPayout = localStorage.getItem("payoutPerArticle");
    if (storedPayout) {
      setPayoutPerArticle(Number(storedPayout)); // Convert to number
    }

    // Load articles from localStorage, defaulting to an empty array if none are found
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles(storedArticles); // Set the articles in state
  }, []);

  // Effect to calculate the total payout whenever articles change
  useEffect(() => {
    if (articles.length) {
      calculateTotalPayout(); // Recalculate payout when articles are updated
    }
  }, [articles]);

  // Function to calculate total payout based on the number of articles and payout per article
  const calculateTotalPayout = () => {
    const total = articles.length * payoutPerArticle;
    setTotalPayout(total); // Update the total payout in state
  };

  // Function to save the payout amount to localStorage and calculate total payout
  const handleSavePayout = () => {
    if (payoutPerArticle == 0 || payoutPerArticle < 0) {
      return toast.error("Please enter a positive amount greater than zero.");
    }

    // Save the payout amount in localStorage for future use
    localStorage.setItem("payoutPerArticle", payoutPerArticle.toString());
    toast.success("Payout amount set successfully."); // Show success toast

    calculateTotalPayout(); // Recalculate the total payout after setting the amount
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkBackground p-6">
      <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Heading section */}
        <h2 className="text-2xl max-sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Set Payout Per Article
        </h2>

        {/* Input field for payout amount */}
        <div className="mb-4">
          <label
            htmlFor="payout"
            className="block text-lg max-sm:text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Payout Amount ($)
          </label>
          <input
            type="number"
            id="payout"
            value={payoutPerArticle}
            onChange={(e) => setPayoutPerArticle(Number(e.target.value))}
            className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter payout per article"
          />
        </div>

        {/* Save button */}
        <div className="mb-4">
          <button
            onClick={handleSavePayout} // Calls handleSavePayout on click
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Save Payout
          </button>
        </div>

        {/* Display total payout for all articles */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Total Payout for All Articles:
          </h3>
          <p className="text-xl font-semibold text-indigo-600">
            ${totalPayout.toFixed(2)}{" "}
            {/* Displays the total payout with two decimal places */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
