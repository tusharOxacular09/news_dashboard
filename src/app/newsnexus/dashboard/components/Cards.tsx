import Link from "next/link";

// Define the type for the PayoutCard props, which expects a payoutPerArticle of type number
type PayoutCardProps = {
  payoutPerArticle: number;
};

// PayoutCard Component: Displays the payout amount per article and provides a button to set it in the settings
export const PayoutCard = ({ payoutPerArticle }: PayoutCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col justify-between">
    {/* Header displaying the title of the card */}
    <h2 className="text-gray-800 dark:text-white font-bold text-lg">
      Per Article Price
    </h2>
    {/* Description explaining the per article price */}
    <p className="text-gray-600 dark:text-gray-300">
      Per article price refers to the cost for each individual item or unit in a
      purchase.
    </p>
    {/* Flex container for the payout amount and action button */}
    <div className="flex justify-between items-center mt-2">
      {/* Displaying the payout amount */}
      <p className="text-gray-800 dark:text-gray-300 text-lg font-semibold">
        ${payoutPerArticle}
      </p>
      {/* Link to the settings page to modify the payout per article */}
      <Link href="/newsnexus/settings">
        <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600">
          Set Now
        </button>
      </Link>
    </div>
  </div>
);

// NewsCard Component: Displays a call to action to explore trending news articles
export const NewsCard = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col justify-between">
    {/* Header displaying the number of news articles available today */}
    <h2 className="text-gray-800 dark:text-white font-bold text-lg">
      400K+ News Today
    </h2>
    {/* Description for the NewsCard */}
    <p className="text-gray-600 dark:text-gray-300">
      Explore trending news articles from top sources.
    </p>
    {/* Link to the news search page */}
    <Link href={"/newsnexus/news"}>
      <button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-600">
        Search Now
      </button>
    </Link>
  </div>
);

// Define the type for the TotalPayoutCard props, which expects a totalPayout of type number
type TotalPayoutCardProps = {
  totalPayout: number;
};

// TotalPayoutCard Component: Displays the total payout and an explanation of earnings
export const TotalPayoutCard = ({ totalPayout }: TotalPayoutCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col justify-between">
    {/* Header displaying the title of the card */}
    <h2 className="text-gray-800 dark:text-white font-bold text-lg">
      Total Payout
    </h2>
    {/* Description explaining the total payout */}
    <p className="text-gray-600 dark:text-gray-300">
      Easily Track Your Total Earnings in One Convenient View.
    </p>
    {/* Displaying the total payout amount */}
    <p className="text-gray-800 dark:text-gray-300 text-2xl font-bold mt-3">
      ${totalPayout}
    </p>
  </div>
);
