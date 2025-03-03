
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, Droplets, BarChart2, LineChart, LucideGlobe } from "lucide-react";

const routes = [
  { path: "/", label: "Home", icon: <LucideGlobe className="w-4 h-4 mr-1" /> },
  { path: "/dashboard", label: "Dashboard", icon: <BarChart2 className="w-4 h-4 mr-1" /> },
  { path: "/predictions", label: "Predictions", icon: <LineChart className="w-4 h-4 mr-1" /> },
  { path: "/insights", label: "Insights", icon: <Droplets className="w-4 h-4 mr-1" /> },
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
          ? "bg-slate-900/90 backdrop-blur-md border-slate-800"
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400" />
              </motion.div>
              <span className="font-semibold text-lg text-white">OceanClimate</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <NavLink key={route.path} to={route.path} active={location.pathname === route.path} icon={route.icon}>
                {route.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
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
          className="md:hidden bg-slate-900 border-t border-slate-800"
        >
          <div className="py-4 px-4 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  location.pathname === route.path
                    ? "bg-slate-800 text-purple-400"
                    : "hover:bg-slate-800 text-slate-200"
                )}
              >
                {route.icon}
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
  icon,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  return (
    <Link to={to} className="relative group py-2">
      <span
        className={cn(
          "flex items-center text-sm font-medium transition-colors",
          active ? "text-purple-400" : "text-slate-200 hover:text-white"
        )}
      >
        {icon}
        {children}
      </span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-500"
          layoutId="navbar-indicator"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
