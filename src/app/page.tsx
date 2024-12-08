// Importing the Login component and ThemeToggle component
import Login from "@/components/global/Login";
import ThemeToggle from "@/components/global/ThemeToggle";

export default function Home() {
  return (
    // Container that takes the full height of the screen and centers content
    <div className="min-h-screen bg-gray-50 dark:bg-darkBackground flex items-center justify-center">
      {/* Theme Toggle Button at the top right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />{" "}
        {/* Allows the user to toggle between light and dark themes */}
      </div>

      {/* Login Component for user authentication */}
      <Login />
    </div>
  );
}
