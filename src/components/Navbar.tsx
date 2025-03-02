
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

const routes = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/predictions", label: "Predictions" },
  { path: "/insights", label: "Insights" },
  { path: "/about", label: "About" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
              </motion.div>
              <span className="font-semibold text-lg">Climate Insights</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <NavLink key={route.path} to={route.path} active={location.pathname === route.path}>
                {route.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="py-4 px-4 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "block py-2 px-3 rounded-lg transition-colors",
                  location.pathname === route.path
                    ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

const NavLink = ({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} className="relative group py-2">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          active ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
        )}
      >
        {children}
      </span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
          layoutId="navbar-indicator"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
