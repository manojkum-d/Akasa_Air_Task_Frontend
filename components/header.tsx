"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, ShoppingBag, Menu } from "lucide-react";
import { motion } from "framer-motion";

const HeaderItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="relative"
  >
    <Link
      href={href}
      className="text-current hover:text-green-400 transition-colors"
    >
      {children}
    </Link>
  </motion.li>
);

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="bg-white dark:bg-black shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            🥕 FreshMart
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block`}>
            <motion.ul
              className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0"
              initial={isMenuOpen ? { opacity: 0, y: -20 } : false}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.3 }}
            >
              <HeaderItem href="/products">Products</HeaderItem>
              <HeaderItem href="/categories">Categories</HeaderItem>
              <HeaderItem href="/specials">Specials</HeaderItem>
              <HeaderItem href="/about">About</HeaderItem>
            </motion.ul>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "#4caf50" }} // Added hover effect
              whileTap={{ scale: 0.5 }}
              className="bg-green-500 dark:bg-gray-00 text-white hover:bg-green-600 dark:hover:bg-gray-600 transition-colors p-2 rounded-full"
            >
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
