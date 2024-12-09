import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/features/news/types"; // Article type definition

const ArticleList = ({
  filteredArticles,
  handleAddToPayout,
}: {
  filteredArticles: Article[];
  handleAddToPayout: (article: Article) => void;
}) => {
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(12); // Track how many articles to show initially

  // Function to load more articles
  const loadMoreArticles = () => {
    setVisibleArticlesCount((prevCount) => prevCount + 12); // Show 12 more articles
  };

  // Determine the articles to show based on the visibleArticlesCount
  const displayedArticles = filteredArticles.slice(0, visibleArticlesCount);

  return (
    <div>
      <ul className="mt-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {displayedArticles.map((article: Article, index: number) => (
          <ArticleCard
            key={index}
            article={article}
            index={index}
            onAddToPayout={handleAddToPayout}
          />
        ))}
      </ul>

      {/* Load More Button */}
      {filteredArticles.length > visibleArticlesCount && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreArticles}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
