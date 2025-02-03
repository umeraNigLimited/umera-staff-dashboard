import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import {
  AlertTriangle,
  ChartNoAxesGantt,
  Package,
  TrendingUp,
} from "lucide-react";
// import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
// import SalesTrendChart from "../components/products/SalesTrendChart";
// import ProductsTable from "../components/products/ProductsTable";
import TaskTable from "../components/tasks/TaskTable";
import { useTasksContext } from "../components/hooks/useTasksContext";

const TaskPage = () => {
  const { tasks, metrics } = useTasksContext();
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Task" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-16">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Achieved"
            icon={Package}
            value={`${metrics.achievedTasks}/${metrics.totalTasks}`}
            color="#6366F1"
          />
          <StatCard
            name="High Priority"
            icon={TrendingUp}
            value={metrics.highPriorityTasks}
            color="#10B981"
          />
          <StatCard
            name="Low Priority"
            icon={AlertTriangle}
            value={metrics.lowPriorityTasks}
            color="#F59E0B"
          />
          <StatCard
            name="Medium Priority"
            icon={ChartNoAxesGantt}
            value={metrics.mediumPriorityTasks}
            color="#EF4444"
          />
        </motion.div>
        <TaskTable d={tasks} />
        {/* <ProductsTable /> */}

        {/* CHARTS */}
        {/* <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
        </div> */}
      </main>
    </div>
  );
};
export default TaskPage;
