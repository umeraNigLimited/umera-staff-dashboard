import React, { useEffect } from "react";
import {
  BarChart2,
  ClipboardCheck,
  DoorOpen,
  AlertTriangle,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import Celebration from "../components/overview/Celebration";
import Announcement from "../components/overview/Announcement";
import { useTasksContext } from "../components/hooks/useTasksContext";
import { differenceInDays } from "date-fns";
import { useLeaveContext } from "../components/hooks/useLeaveContext";
import { useQueryContext } from "../components/hooks/useQueryContext";
import TaskOverview from "../components/overview/TasksOverview";

const OverviewPage = () => {
  const { tasks, metrics } = useTasksContext();
  const { leaveMetrics } = useLeaveContext();
  const { queryMetrics } = useQueryContext();

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Browser notifications enabled");
        } else {
          console.log("Browser notifications denied");
        }
      });
    }
  }, []);

  const processTasks = () => {
    return tasks.map((task) => {
      const deadline = new Date(task.due_date); // Convert backend date string to Date object

      // Calculate days left
      const today = new Date();
      const daysLeft = differenceInDays(deadline, today);

      let status;
      if (daysLeft <= 5) {
        status = `${daysLeft} days left`;
      } else if (daysLeft === 0) {
        status = "Due today";
      } else {
        status = "Overdue";
      }

      return {
        ...task,
        status,
      };
    });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Acheived Task"
            icon={ClipboardCheck}
            value={`${metrics.achievedTasks}/${metrics.totalTasks}`}
            color="#6366F1"
          />
          <StatCard
            name="Leave"
            icon={DoorOpen}
            value={`${leaveMetrics.totalLeaveDays}/10`}
            color="#8B5CF6"
          />
          <StatCard
            name="Query"
            icon={AlertTriangle}
            value={`${queryMetrics.totalQuery}/3`}
            color="#EC4899"
          />
          <StatCard
            name="Productivity"
            icon={BarChart2}
            value="0%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Announcement />
          <Celebration />
          {/* <CategoryDistributionChart /> */}
          <TaskOverview />
          {/* <RevenueChannelChart /> */}
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
