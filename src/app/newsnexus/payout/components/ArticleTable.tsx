import { Delete } from "lucide-react";

// **ArticleTable Component** - Renders the table of articles
const ArticleTable = ({
  articles,
  handleDeleteArticle,
}: {
  articles: Array<any>;
  handleDeleteArticle: (index: number) => void;
}) => {
  if (articles.length === 0) {
    return (
      <div className="text-center text-gray-700 dark:text-gray-200 py-4">
        No articles available. Please add some articles.
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-base">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-base">
              Author
            </th>
            <th scope="col" className="px-6 py-3 text-base max-md:hidden">
              Content
            </th>
            <th scope="col" className="px-6 py-3 text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr
              key={index}
              className="odd:bg-white max-sm:text-xs odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">{article.title || "-"}</td>
              <td className="px-6 py-4">{article.author || "-"}</td>
              <td className="px-6 py-4 max-md:hidden">
                {article.content || "-"}
              </td>
              <td className="px-6 py-4 flex items-center justify-center">
                <button
                  onClick={() => handleDeleteArticle(index)}
                  className="py-1 px-2 text-red-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <Delete className="inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
