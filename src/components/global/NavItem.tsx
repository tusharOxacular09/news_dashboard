"use client";

import Link from "next/link";
import { NavItemProps } from "@/types/types";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

/**
 * NavItem Component
 * -----------------
 * This component renders a navigation link with dynamic styling based on the active route.
 * It supports different styles for mobile and desktop views.
 *
 * Props:
 * - `destination` (string): The URL where the link points to.
 * - `isMobile` (boolean): Determines whether the link is displayed in a mobile context.
 * - `name` (string): The visible text for the navigation link.
 */

const NavItem: React.FC<NavItemProps> = ({
  destination,
  isMobile,
  name,
  handleClose,
}) => {
  const pathName = usePathname(); // Retrieve the current pathname to determine the active route.

  return (
    <Link
      href={destination}
      onClick={() => {
        // Logout
        if (name === "Logout") signOut();
        // Closing Menubar
        if (isMobile && handleClose) handleClose();
      }}
    >
      <span
        className={`${
          isMobile ? "block" : "" // Apply block display for mobile views.
        } ${
          pathName === destination
            ? // Active route styling:
              "xl:text-primary-700 xl:dark:text-white max-xl:bg-gray-200 max-xl:dark:bg-gray-700 max-xl:dark:text-white"
            : // Default styling:
              ""
        } py-2 pr-4 pl-3 text-gray-700
          hover:bg-gray-200 xl:hover:bg-transparent xl:border-0 xl:hover:text-primary-700 
          xl:p-0 dark:text-gray-400 xl:dark:hover:text-white
          dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent 
          dark:border-gray-700 max-xl:rounded`}
      >
        {name}
      </span>
    </Link>
  );
};

export default NavItem;
