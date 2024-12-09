import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for the chart
ChartJS.register(
  CategoryScale, // For the x-axis categories (authors)
  LinearScale, // For the y-axis scale (article counts)
  BarElement, // For creating the bar chart elements
  Title, // For adding a title to the chart
  Tooltip, // For enabling tooltips on hover
  Legend // For displaying the chart legend
);

// Define types for the props of the BarChart component
type BarChartProps = {
  authors: string[]; // List of authors to be displayed on the x-axis
  articleCounts: number[]; // Corresponding article counts for each author
};

// BarChart component: Displays a bar chart showing the distribution of articles by authors
export const BarChart = ({ authors, articleCounts }: BarChartProps) => {
  // Define chart data structure: labels (authors) and datasets (article counts)
  const chartData = {
    labels: authors, // Set the authors as the labels for the x-axis
    datasets: [
      {
        label: "Articles by Author", // The label for the dataset shown in the legend
        data: articleCounts, // The article counts to plot on the y-axis
        backgroundColor: [
          // Different background colors for each bar
          "#4CAF50", // Green
          "#FFC107", // Yellow
          "#03A9F4", // Blue
          "#E91E63", // Pink
          "#9C27B0", // Purple
        ],
        borderColor: "#ddd", // Border color for the bars
        borderWidth: 1, // Border width for the bars
        hoverBackgroundColor: [
          // Hover effect background color for each bar
          "#81C784", // Lighter green
          "#FFD54F", // Lighter yellow
          "#4FC3F7", // Lighter blue
          "#F06292", // Lighter pink
          "#CE93D8", // Lighter purple
        ],
      },
    ],
  };

  return (
    <Bar
      data={chartData} // Pass the chart data to the Bar component
      options={{
        responsive: true, // Ensure the chart is responsive (adjusts to container size)
        plugins: {
          legend: { position: "top" }, // Position of the legend at the top of the chart
          title: {
            display: true, // Display the title of the chart
            text: "Articles Distribution by Author", // Title text
            color: "#4f46e5", // Title color
            font: {
              size: 18, // Title font size
            },
          },
        },
        scales: {
          // x-axis configuration
          x: {
            ticks: { color: "#666" }, // Set the tick labels color
            grid: { color: "#ccc" }, // Set the grid line color for the x-axis
          },
          // y-axis configuration
          y: {
            ticks: { color: "#666" }, // Set the tick labels color
            grid: { color: "#ccc" }, // Set the grid line color for the y-axis
          },
        },
      }}
    />
  );
};
