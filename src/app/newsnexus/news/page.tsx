"use client";

import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchNews } from "@/lib/features/news/newsSlice";
import { toast } from "react-hot-toast";
import Loader from "@/components/global/Loader";
import { Article } from "@/lib/features/news/types";
import AuthorSearch from "./components/AuthorSearch";
import SearchNews from "./components/SearchNews";
import { RotateCcw } from "lucide-react";
import { resetNewsState } from "@/lib/features/news/newsSlice";
import ArticleList from "./components/ArticleList";
import { useRouter } from "next/navigation";
import { formatDate } from "./helpers/formatDate";

/**
 * News Search and Filter Page.
 */
export default function News() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Accessing state from the Redux store
  const { articles, totalResults, status } = useAppSelector(
    (state) => state.news
  );

  // State management for form and search parameters
  const [query, setQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [authorSearch, setAuthorSearch] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  // Function to handle adding an article to the payout
  const handleAddToPayout = (article: Article) => {
    // Check if the payout per article is set, otherwise prompt user to set it
    const storedPayout = localStorage.getItem("payoutPerArticle");
    if (!storedPayout) {
      router.push("/newsnexus/settings");
      return toast.error("Please set the price per article.");
    }

    // Retrieve previously added articles from localStorage
    const prevArticles = JSON.parse(localStorage.getItem("articles") || "[]");

    if (prevArticles && Array.isArray(prevArticles)) {
      // Check if the article is already in the list based on title and description
      const isArticleAlreadyAdded = prevArticles.some(
        (existingArticle) =>
          existingArticle.title === article.title &&
          existingArticle.description === article.description
      );

      // If already added, show a warning
      if (isArticleAlreadyAdded) {
        return toast.error("This article is already added.");
      }

      // If not, add the new article to the list and update localStorage
      localStorage.setItem(
        "articles",
        JSON.stringify([...prevArticles, article])
      );
    } else {
      // If no articles exist, initialize the array with the new article
      localStorage.setItem("articles", JSON.stringify([article]));
    }

    // Show a success message after adding the article
    toast.success("Article successfully added to the cart.");
  };

  // Function to handle the news search based on query, start date, and end date
  const handleSearch = () => {
    if (!query) {
      toast.error("Please provide the topic.");
      return;
    }

    // Format start and end dates if provided
    const formattedStartDate = startDate ? formatDate(startDate) : null;
    const formattedEndDate = endDate ? formatDate(endDate) : null;

    // Dispatch the fetchNews action to retrieve articles based on the search parameters
    dispatch(
      fetchNews({
        query,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
  };

  // Memoized list of authors for the author search dropdown
  const authors = useMemo(() => {
    // Extract unique authors from the articles
    const uniqueAuthors = Array.from(
      new Set(articles.map((article) => article.author || "Unknown"))
    );

    // Filter authors based on the search input
    return uniqueAuthors.filter((author) =>
      author.toLowerCase().includes(authorSearch.toLowerCase())
    );
  }, [articles, authorSearch]);

  // Memoized list of filtered articles based on the selected author
  const filteredArticles = useMemo(() => {
    // If no specific author is selected, return all articles
    if (!selectedAuthor || selectedAuthor === "All") return articles;
    // Filter articles by selected author
    return articles.filter(
      (article) =>
        article.author?.toLowerCase() === selectedAuthor.toLowerCase()
    );
  }, [articles, selectedAuthor]);

  // Function to reset all search parameters and clear Redux state
  const handleReset = () => {
    setAuthorSearch("");
    setSelectedAuthor("");
    setQuery("");
    setStartDate(null);
    setEndDate(null);
    dispatch(resetNewsState());
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkBackground p-6 max-sm:p-4 text-gray-900 dark:text-white">
      {/* Search component to handle query, start date, and end date */}
      <SearchNews
        query={query}
        setQuery={setQuery}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSearch={handleSearch}
      />

      {/* Display filter controls if there are filtered articles */}
      {filteredArticles.length ? (
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full items-center justify-center gap-4 mt-4 sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:max-w[70%] 2xl:max-w-[1080px]">
            <AuthorSearch
              authorSearch={authorSearch}
              setAuthorSearch={setAuthorSearch}
              authors={authors}
              setSelectedAuthor={setSelectedAuthor}
            />
            {/* Reset button to clear all filters */}
            <button
              className="flex items-center justify-center gap-2 max-sm:gap-1 bg-[#6C757D] text-white py-2.5 px-4 max-sm:px-2 max-sm:text-sm rounded-lg"
              onClick={handleReset}
            >
              <RotateCcw className="max-sm:w-5" /> <span>Reset</span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Show loader if status is loading */}
      {status === "loading" && <Loader />}

      {/* Display message if status is failed */}
      {status === "failed" && (
        <span className="w-full flex items-center justify-center text-gray-400 dark:text-white text-[18px] py-6">
          No result found
        </span>
      )}

      {/* Show total results if any articles are found */}
      {totalResults ? (
        <div className="w-full px-4 pt-6 flex items-center justify-end">
          <div className="text-gray-600 dark:text-white text-lg font-semibold flex items-center gap-2">
            <span>Total Articles</span>
            <span className="bg-gray-300 dark:bg-white text-indigo-500 font-bold py-1 px-3 rounded-full shadow">
              {filteredArticles?.length || totalResults}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Display articles if the status is succeeded */}
      {status === "succeeded" && (
        <div className="mt-6">
          <ArticleList
            filteredArticles={filteredArticles}
            handleAddToPayout={handleAddToPayout}
          />

          {/* Message if no filtered articles */}
          {!filteredArticles?.length ? (
            <span className="w-full flex items-center justify-center text-gray-400 dark:text-white text-[18px] py-6">
              No result found
            </span>
          ) : (
            ""
          )}
        </div>
      )}

      {/* Display a message if no articles are found and status is not succeeded or failed */}
      {status != "succeeded" && status != "failed" && (
        <span className="w-full flex items-center justify-center text-gray-400 dark:text-white text-[18px] max-md:text-sm text-center py-14">
          Discover the latest news anytime, anywhere—stay informed, stay
          connected, stay ahead!
        </span>
      )}
    </div>
  );
}
