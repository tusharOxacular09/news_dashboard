"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import NavItem from "./NavItem";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Array of navigation items
  const navItems = [
    { destination: "/newsnexus/dashboard", name: "Dashboard" },
    { destination: "/newsnexus/news", name: "News & Articles" },
    { destination: "/newsnexus/payout", name: "Payout Calculator" },
    { destination: "/newsnexus/settings", name: "Settings" },
    { destination: "", name: "Logout" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-darkBackground dark:border-gray-700 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        {/* Logo Section */}
        <div className="mr-4 flex items-center space-x-2">
          <img src="/assets/logo.svg" className="h-10 w-10" alt="Logo" />
          <h1 className="text-lg font-semibold font-sans text-gray-800 dark:text-gray-200 md:text-xl">
            NewsNexus
          </h1>
        </div>

        {/* Right Section - Theme Toggle */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Desktop Menu Items */}
          <div className="max-xl:hidden space-x-6">
            {navItems.map((item) => (
              <NavItem
                key={item.destination}
                destination={item.destination}
                isMobile={false}
                name={item.name}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 p-2"
            >
              {/* Menu icon for mobile */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-darkBackground shadow-lg space-y-4 py-4 px-6">
          {navItems.map((item) => (
            <NavItem
              key={item.destination}
              destination={item.destination}
              isMobile={true}
              name={item.name}
              handleClose={() => setIsMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </header>
  );
}
