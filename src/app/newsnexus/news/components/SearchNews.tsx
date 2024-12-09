import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search } from "lucide-react";

interface SearchNewsProps {
  query: string;
  setQuery: (query: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  handleSearch: () => void;
}

const SearchNews: React.FC<SearchNewsProps> = ({
  query,
  setQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
}) => {
  const [minEndDate, setMinEndDate] = useState<Date | null>(null);
  const [maxStartDate, setMaxStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (startDate) {
      setMinEndDate(startDate); // Ensure the end date cannot be before the start date
    } else {
      setMinEndDate(null); // Reset minEndDate if startDate is cleared
    }

    if (endDate) {
      setMaxStartDate(endDate); // Ensure the start date cannot be after the end date
    } else {
      setMaxStartDate(null); // Reset maxStartDate if endDate is cleared
    }
  }, [startDate, endDate]);

  return (
    <div className="w-full transition-colors duration-300 ">
      <div className="relative w-full flex items-center justify-center max-lg:flex-col max-lg:items-center max-lg:justify-center">
        {/* Search Header */}
        <div className="w-48 h-[128px] bg-primary-700 rounded-[39px] shadow-lg font-semibold text-white text-center text-xl pt-1.5 max-lg:hidden">
          Search News
        </div>

        {/* Search Box */}
        <div className="bg-white border lg:pt-1 dark:bg-gray-800 dark:border-gray-700 rounded-xl max-lg:border max-lg:border-primary-700 max-lg:p-4 max-sm:py-4 max-sm:px-2 lg:rounded-full lg:h-[88px] lg:absolute lg:bottom-0 shadow-lg flex max-lg:flex-col justify-between 2xl:max-w-[1080px] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:max-w[70%] w-full lg:pe-[20px] mt-[20px] lg:mt-0">
          {/* Search Input */}
          <div className="relative w-full h-full flex lg:flex-col max-lg:gap-2 max-lg:items-center max-lg:justify-center p-[10px_15px] bg-white dark:bg-gray-800 lg:bg-transparent rounded-xl lg:rounded-full">
            <label
              className="w-36 flex items-center justify-start gap-0.5 max-sm:w-32 ml-2 pl-1 lg:mb-1 max-sm:text-sm max-lg:me-1 max-lg:mb-0 text-gray-700 dark:text-white max-lg:text-base"
              htmlFor="city"
            >
              News Topic <span className="text-red-500">*</span>
            </label>
            <div className="w-full max-lg:border-b max-lg:border-b-gray-600 max-lg:dark:border-gray-200 relative pl-1 mt-0.5">
              <input
                type="text"
                autoComplete="off"
                className="border-none max-lg:border max-sm:text-sm w-full outline-none focus:ring-0 max-lg:text-base pr-2 px-2 max-lg:py-2 max-lg:px-1 rounded-lg pac-target-input dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a topic (e.g. IND VS AUS 2nd Test)"
              />
            </div>
            <div className="absolute right-0 w-[6px] h-[68px] rounded-full top-1.5 bg-primary-700 max-lg:hidden"></div>
          </div>

          {/* Date Pickers */}
          <div className="w-full max-lg:mt-6 flex max-lg:justify-evenly max-lg:items-center max-sm:px-4 max-lg:px-7 py-[10px] max-lg:py-0">
            {/* From Date Picker */}
            <div className="relative w-1/2 max-lg:w-auto h-full flex flex-col items-center max-lg:items-start lg:justify-evenly">
              <p className="text-center lg:mr-6 font-medium text-gray-500 dark:text-white">
                From
              </p>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                className="border-none h-[30px] w-[120px] focus:outline-0 focus:shadow-none focus:ring-0 focus:border-[#fff] px-[15px] text-[14px] text-[#000] mb-[23px] py-0 ps-0 bg-no-repeat bg-[85%_45%] bg-[length:12px] cursor-pointer leading-[18px] dark:bg-gray-800 dark:text-white dark:focus:ring-0"
                placeholderText="DD-Mon-YYYY"
                dateFormat="dd-MMM-yyyy"
                maxDate={maxStartDate || new Date()}
              />
            </div>

            {/* To Date Picker */}
            <div className="relative w-1/2 max-lg:w-auto h-full flex flex-col items-center max-lg:items-start lg:justify-evenly">
              <div className="absolute left-0 w-[6px] h-[68px] rounded-full bg-primary-700 max-lg:hidden"></div>
              <p className="text-center lg:mr-6 font-medium text-gray-700 dark:text-white">
                To
              </p>
              <div className="flex max-lg:flex-col w-full justify-center items-center max-lg:items-start px-3 max-lg:px-0 2xl:px-4">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  className="border-none h-[30px] w-[120px] focus:outline-0 focus:shadow-none focus:ring-0 focus:border-[#fff] px-[25px] text-[14px] text-[#000] mb-[23px] py-0 ps-0 bg-no-repeat bg-[85%_45%] bg-[length:12px] cursor-pointer leading-[18px] dark:bg-gray-800 dark:text-white dark:focus:ring-0"
                  placeholderText="DD-Mon-YYYY"
                  dateFormat="dd-MMM-yyyy"
                  minDate={minEndDate || undefined}
                  maxDate={new Date()}
                />
              </div>
            </div>

            <button className="flex items-center justify-center max-lg:hidden">
              <Search
                onClick={handleSearch}
                className="cursor-pointer w-9 h-10"
              />
            </button>
          </div>

          {/* Search Button (for mobile) */}
          <div className="text-center lg:hidden mt-3 max-sm:mt-0 mb-1">
            <button
              onClick={handleSearch}
              className="font-semibold bg-primary-700 max-sm:text-sm hover:bg-primary-600 rounded-full px-20 py-2 max-sm:py-1.5 max-sm:px-16 text-white dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchNews;
