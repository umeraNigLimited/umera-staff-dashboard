import { motion } from "framer-motion";

const Announcement = () => {
  const celebration = [];
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">Annoucement</h2>
      <div class="h-full border-t border-gray-400 overflow-visible"></div>
      {/* <div className="h-80"></div> */}
    </motion.div>
  );
};
export default Announcement;
