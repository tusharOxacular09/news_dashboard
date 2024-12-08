"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  // Initialize state with null, as we want to wait for client-side rendering
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client side after the component is mounted.
    // It checks if there is a saved theme in localStorage.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // If a saved theme is found, update the darkMode state based on the saved value
      setDarkMode(savedTheme === "dark");
    } else {
      // If no saved theme exists, set darkMode to false (light mode by default)
      setDarkMode(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // This effect runs whenever the darkMode state changes.
    // It updates the DOM and localStorage based on the darkMode value.
    if (darkMode === null) return; // Prevent effect execution if darkMode is still null

    if (darkMode) {
      // If darkMode is true, add the 'dark' class to the root HTML element and save the theme in localStorage
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // If darkMode is false, remove the 'dark' class and save the theme as light in localStorage
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]); // Dependency on darkMode ensures the effect runs every time it changes

  // Toggle the darkMode state when the button is clicked
  const handleToggle = () => setDarkMode((prev) => !prev);

  // If darkMode is still null (waiting for client-side evaluation), return null to prevent rendering
  if (darkMode === null) return null;

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`} // For accessibility, dynamic label based on the current mode
      className="max-sm:right-2 max-md:top-2 p-2 rounded-full bg-gray-300 dark:bg-gray-800 shadow-lg transition-all duration-300 hover:scale-110 focus:ring focus:ring-indigo-700"
    >
      <div className="relative flex items-center justify-center">
        {/* Sun icon - Visible in dark mode */}
        <Sun
          className={`h-5 w-5 transform transition-all ${
            darkMode ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`} // Transitions between visible/invisible states smoothly
        />
        {/* Moon icon - Visible in light mode */}
        <Moon
          className={`absolute h-5 w-5 text-black transform transition-all ${
            darkMode ? "-rotate-90 scale-0" : "rotate-0 scale-100"
          }`} // Transitions between visible/invisible states smoothly
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
