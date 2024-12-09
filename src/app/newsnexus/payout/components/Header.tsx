// **PayoutSummary Component** - Displays payout-related information
const Header = ({
  payoutPerArticle,
  totalPayout,
  handleExportCSV,
  handleExportPDF,
}: {
  payoutPerArticle: any;
  totalPayout: any;
  handleExportCSV: () => void;
  handleExportPDF: () => void;
}) => (
  <div className="flex items-center justify-start max-lg:flex-col gap-4 mb-4 max-lg:items-start">
    {/* Payout per Article */}
    <div className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-4 max-sm:py-2 text-center inline-flex items-center gap-2 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">
        Payout per Article:
      </h3>
      <p className="text-lg font-semibold text-indigo-600 ml-2">
        ${payoutPerArticle.toFixed(2)}
      </p>
    </div>

    {/* Total Payout */}
    <div className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-4 max-sm:py-2 text-center inline-flex items-center gap-2 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-200">
        Total Payout for All Articles:
      </h3>
      <p className="text-lg font-semibold text-indigo-600 ml-2">
        ${totalPayout.toFixed(2)}
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4 max-lg:w-full">
      <button
        onClick={handleExportCSV}
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-4 max-sm:py-2 text-center inline-flex items-center gap-2 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <img src="/assets/csv.png" alt="CSV Logo" className="h-6" />
        Export as CSV
      </button>
      <button
        onClick={handleExportPDF}
        className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 max-sm:px-4 max-sm:py-2 text-center inline-flex items-center gap-2 dark:focus:ring-[#2557D6]/50"
      >
        <img src="/assets/pdf.png" alt="PDF Logo" className="h-6" />
        Export as PDF
      </button>
    </div>
  </div>
);

export default Header;
