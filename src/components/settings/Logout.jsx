import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useLogOut } from "../hooks/useLogOut";

const Logout = () => {
  const { logout } = useLogOut;
  function handleLogout() {
    logout();
  }
  return (
    <motion.div
      className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <LogOut className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-gray-100">Log Out</h2>
      </div>
      <p className="text-gray-300 mb-4">Log out of your Account for a while.</p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded 
      transition duration-200"
        onClick={handleLogout}
      >
        Log out Account.
      </button>
    </motion.div>
  );
};
export default Logout;
