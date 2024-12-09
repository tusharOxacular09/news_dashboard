"use client";
import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "./components/Header";
import ArticleTable from "./components/ArticleTable";

// **Main Payout Component**
const Payout = () => {
  const [articles, setArticles] = useState<Array<any>>([]);
  const [payoutPerArticle, setPayoutPerArticle] = useState<number>(0);
  const [totalPayout, setTotalPayout] = useState<number>(0);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const storedPayout = localStorage.getItem("payoutPerArticle");
    if (storedPayout) setPayoutPerArticle(Number(storedPayout));
    setArticles(storedArticles);
  }, []);

  useEffect(() => {
    setTotalPayout(articles.length * payoutPerArticle);
  }, [articles, payoutPerArticle]);

  const handleDeleteArticle = (index: number) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    toast.success("Article deleted successfully!");
  };

  const handleExportCSV = () => {
    const filteredArticles = articles.map(({ source, ...article }) => article);
    const csvData = Papa.unparse(filteredArticles);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "articles.csv";
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Call autoTable on the doc instance
    autoTable(doc, {
      head: [["Title", "Author", "Content"]],
      body: articles.map((article) => [
        article.title || "N/A",
        article.author || "N/A",
        article.content || "N/A",
      ]),
    });

    // Save the generated PDF
    doc.save("articles.pdf");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkBackground p-6">
      <div className="max-w-6xl mx-auto rounded-lg">
        <h2 className="text-3xl max-md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Articles
        </h2>
        <Header
          payoutPerArticle={payoutPerArticle}
          totalPayout={totalPayout}
          handleExportCSV={handleExportCSV}
          handleExportPDF={handleExportPDF}
        />

        <ArticleTable
          articles={articles}
          handleDeleteArticle={handleDeleteArticle}
        />
      </div>
    </div>
  );
};

export default Payout;
