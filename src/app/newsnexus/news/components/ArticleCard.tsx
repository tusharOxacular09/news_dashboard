import React, { useState } from "react";
import { X } from "lucide-react"; // Importing the X icon from lucide-react
import { Article } from "@/lib/features/news/types"; // Article type definition

const ArticleCard = ({
  article,
  index,
  onAddToPayout,
}: {
  article: Article;
  index: number;
  onAddToPayout: (article: Article) => void; // Function to handle adding article to payout
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Opens the modal to show the full article details
  const openModal = () => setIsModalOpen(true);

  // Closes the modal
  const closeModal = () => setIsModalOpen(false);

  // Calls the provided function to add the article to payout
  const handleAddToPayout = () => {
    onAddToPayout(article);
  };

  return (
    <div
      key={index}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      {/* Image Section: Displays the article image */}
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-t-lg w-full object-cover max-h-40"
          src={article.urlToImage || "/assets/news-paper.png"} // Default image if URL is unavailable
          alt={article.title} // Alt text for accessibility
        />
      </a>

      {/* Content Section: Displays title, description, and buttons */}
      <div className="p-5">
        {/* Title Section: Clickable title that redirects to the article */}
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {article.title}
          </h5>
        </a>

        {/* Author and Date Section: Displays article's author and publication date */}
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          By {article.author || "Unknown"} on{" "}
          {new Date(article.publishedAt).toLocaleDateString()}{" "}
          {/* Formatting date */}
        </p>

        {/* Description Section: Short snippet of the article, limited to 2 lines */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {article.description} {/* Short description preview */}
        </p>

        {/* Read More Button: Opens the modal for full article details */}
        <button
          onClick={openModal}
          className="inline-flex items-center text-sm font-medium text-center text-blue-700 bg-transparent"
        >
          Read More
        </button>

        {/* Add To Payout Button: Adds the article to payout when clicked */}
        <button
          onClick={handleAddToPayout}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add To Payout
        </button>
      </div>

      {/* Modal for full article details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-opacity-80">
          {/* Modal container */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full overflow-y-auto">
            {/* Close Button (X Icon): Close the modal */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-600 p-1 rounded-full hover:bg-gray-700"
            >
              <X size={20} /> {/* X icon to close modal */}
            </button>

            {/* Article Details in Modal */}
            <div className="space-y-6 max-sm:space-y-3">
              {/* Image in Modal: Displays the article's image */}
              <img
                className="w-full h-60 object-cover rounded-lg"
                src={article.urlToImage || "/assets/news-paper.png"}
                alt={article.title}
              />

              {/* Title and Author: Displays title and author info */}
              <h2 className="text-2xl max-sm:text-lg font-bold text-gray-900 dark:text-white">
                {article.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                By {article.author || "Unknown"} on{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>

              {/* Full Description: Shows the entire article content */}
              <p className="text-lg max-sm:text-xs text-gray-700 dark:text-gray-400">
                {article.description}
              </p>

              {/* Add To Payout Button: Adds the article to payout */}
              <button
                onClick={handleAddToPayout}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add To Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
