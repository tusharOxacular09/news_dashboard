"use client";

import { useState, useEffect } from "react";
import { BarChart } from "./components/BarChart";
import { NewsCard, PayoutCard, TotalPayoutCard } from "./components/Cards";
import Link from "next/link";

export default function Dashboard() {
  // State hooks for storing articles, payout per article, and total payout
  const [articles, setArticles] = useState<Array<any>>([]); // Array of articles
  const [payoutPerArticle, setPayoutPerArticle] = useState<number>(0); // Amount paid per article
  const [totalPayout, setTotalPayout] = useState<number>(0); // Total payout calculated based on articles and payout per article

  // Load articles and payout information from localStorage on component mount
  useEffect(() => {
    // Retrieve articles from localStorage (falling back to empty array if not found)
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");

    // Retrieve payout per article from localStorage (defaulting to 0 if not found)
    const storedPayout = Number(
      localStorage.getItem("payoutPerArticle") || "0"
    );

    // Set the state with the retrieved data
    setArticles(storedArticles);
    setPayoutPerArticle(storedPayout);

    // Calculate total payout: total payout = number of articles * payout per article
    setTotalPayout(storedArticles.length * storedPayout);
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Group articles by author and count the number of articles per author
  const groupedByAuthor = articles.reduce((acc: any, article: any) => {
    // Increment the article count for each author
    acc[article.author] = (acc[article.author] || 0) + 1;
    return acc;
  }, {});

  // Extract authors (keys of the grouped object) and their article counts (values of the grouped object)
  const authors = Object.keys(groupedByAuthor);
  const articleCounts = Object.values(groupedByAuthor) as number[]; // Ensure article counts are an array of numbers

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 max-sm:p-4">
      {/* Check if there are articles to display */}
      {articles.length > 0 ? (
        <div className="flex flex-wrap lg:flex-nowrap gap-6 max-sm:gap-4">
          {/* Chart Section - Displays BarChart with authors and article counts */}
          <div className="w-full lg:w-9/12 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center">
            <BarChart authors={authors} articleCounts={articleCounts} />
          </div>

          {/* Right Section - Contains News Card, Payout Card, and Total Payout Card */}
          <div className="w-full lg:w-3/12 flex flex-col gap-6">
            <NewsCard /> {/* Card displaying latest news or articles */}
            <PayoutCard payoutPerArticle={payoutPerArticle} />{" "}
            {/* Card showing payout per article */}
            <TotalPayoutCard totalPayout={totalPayout} />{" "}
            {/* Card showing total payout */}
          </div>
        </div>
      ) : (
        // Fallback when there are no articles to display
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
            No Articles Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please add some articles to see the analytics.
          </p>
          {/* Link to add new articles */}
          <Link href={"/newsnexus/news"}>
            <button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600">
              Add Articles
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
