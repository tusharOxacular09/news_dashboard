import React, { useState, useRef, useEffect } from "react";

interface Props {
  authorSearch: string;
  setAuthorSearch: React.Dispatch<React.SetStateAction<string>>;
  authors: string[];
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const AuthorSearch: React.FC<Props> = ({
  authorSearch,
  setAuthorSearch,
  authors,
  setSelectedAuthor,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (author: string) => {
    setSelectedAuthor(author);
    setShowDropdown(false);
    setAuthorSearch(author); // Clear the search input if desired
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Search Input */}
      <input
        type="text"
        className="w-full p-3 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 transition-all"
        placeholder="Search authors..."
        value={authorSearch}
        onChange={(e) => {
          setAuthorSearch(e.target.value);
          setShowDropdown(true); // Show dropdown on typing
        }}
      />

      {/* Dropdown List */}
      {showDropdown && authorSearch && (
        <ul className="absolute z-20 bg-white dark:bg-gray-900 w-full mt-2 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          {authors.length > 0 ? (
            authors.map((author) => (
              <li
                key={author}
                className="p-3 text-sm text-gray-800 dark:text-gray-200 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 transition-all"
                onClick={() => handleOptionClick(author)}
              >
                {author}
              </li>
            ))
          ) : (
            <li className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              No authors found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AuthorSearch;
