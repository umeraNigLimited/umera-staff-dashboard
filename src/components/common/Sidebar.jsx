import React, { useEffect, useState } from "react";
import {
  BarChart2,
  DollarSign,
  House,
  Menu,
  Settings,
  Volume1,
  ClipboardCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: House,
    color: "white",
    href: "/overview",
  },
  { name: "Tasks", icon: ClipboardCheck, color: "white", href: "/tasks" },
  { name: "Report", icon: TrendingUp, color: "white", href: "/reports" },
  {
    name: "Productivity",
    icon: BarChart2,
    color: "white",
    href: "/Productivity",
  },
  { name: "Broadcast", icon: Volume1, color: "white", href: "/broadcast" },
  //   { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Settings", icon: Settings, color: "white", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDisabled, setIsDisabled] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsDisabled(isMobile);

      if (isMobile) {
        setIsSidebarOpen(false); // Close the sidebar on smaller screens
      }
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      } shrink-sidebar`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      {/* <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700"> */}
      <div className="h-full bg-red-900 p-4 flex flex-col border-r border-red-100">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-red-700 transition-colors max-w-fit disable-menu"
          disabled={isDisabled}
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-red-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
