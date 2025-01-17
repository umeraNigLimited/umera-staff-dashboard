import { motion } from "framer-motion";
import TanStackTable from "../common/Table";
import { useTasksContext } from "../hooks/useTasksContext";
import { Plus } from "lucide-react";

const TaskOverview = () => {
  const { tasks } = useTasksContext();

  if (!tasks || tasks.length === 0) {
    return (
      <motion.div
        className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-medium mb-4 text-gray-900">Tasks</h2>
        <p>No tasks available.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">Tasks</h2>
      <div className="h-auto h-min-80">
        <TanStackTable d={tasks} />
      </div>
    </motion.div>
  );
};
export default TaskOverview;
