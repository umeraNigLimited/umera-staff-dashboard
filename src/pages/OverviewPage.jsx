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
import SalesOverviewChart from "../components/overview/Announcement";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import RevenueChannelChart from "../components/overview/RevenueChannelChart ";
import Celebration from "../components/overview/Celebration";
import Announcement from "../components/overview/Announcement";

const OverviewPage = () => {
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
            value="2/10"
            color="#6366F1"
          />
          <StatCard name="Leave" icon={DoorOpen} value="5/10" color="#8B5CF6" />
          <StatCard
            name="Query"
            icon={AlertTriangle}
            value="0/3"
            color="#EC4899"
          />
          <StatCard
            name="Productivity"
            icon={BarChart2}
            value="12.5%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Announcement />
          <Celebration />
          {/* <CategoryDistributionChart /> */}
          <RevenueChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
