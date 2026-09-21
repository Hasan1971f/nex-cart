import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiMenu,
  FiMoon,
  FiSearch,
  FiShoppingCart,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute(
      "data-theme",
      !isDark ? "dark" : "light"
    );
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-base-300 bg-base-100/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-content shadow-lg"
            >
              N
            </motion.div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                NEX<span className="text-primary">CART</span>
              </h1>
              <p className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-base-content/50 sm:block">
                Smart Shopping
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-base-content/70 hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}

                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : 0 }}
                      className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="btn btn-ghost btn-circle hidden sm:flex"
              aria-label="Search"
            >
              <FiSearch size={19} />
            </motion.button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative btn btn-ghost btn-circle"
              >
                <FiHeart size={19} />

                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-content">
                  0
                </span>
              </motion.div>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative btn btn-ghost btn-circle"
              >
                <FiShoppingCart size={19} />

                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-secondary-content">
                  0
                </span>
              </motion.div>
            </Link>

            {/* Theme */}
            <motion.button
              whileHover={{ rotate: 12, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleThemeToggle}
              className="btn btn-ghost btn-circle hidden sm:flex"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
            </motion.button>

            {/* Login */}
            <Link
              to="/login"
              className="btn btn-primary hidden rounded-full px-5 sm:flex"
            >
              <FiUser size={17} />
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <nav className="flex flex-col gap-1 border-t border-base-300 py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="mt-3 flex items-center gap-2 border-t border-base-300 pt-4">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="btn btn-primary flex-1 rounded-full"
                  >
                    <FiUser size={17} />
                    Login
                  </Link>

                  <button
                    onClick={handleThemeToggle}
                    className="btn btn-outline btn-circle"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;