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

const EmployeesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Employees" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-16">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Staff"
            icon={ClipboardCheck}
            value="0"
            color="#6366F1"
          />
          <StatCard name="Intern" icon={DoorOpen} value="0" color="#8B5CF6" />
          <StatCard
            name="NYCS"
            icon={AlertTriangle}
            value="0"
            color="#EC4899"
          />
          <StatCard
            name="Onboarding"
            icon={BarChart2}
            value="0%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"></div>
      </main>
    </div>
  );
};
export default EmployeesPage;
