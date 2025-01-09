import { motion } from "framer-motion";

const Announcement = () => {
  const celebration = [];
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Annoucement</h2>
      <div class="h-auto border-t border-gray-700 overflow-visible"></div>
      {/* <div className="h-80"></div> */}
    </motion.div>
  );
};
export default Announcement;
