import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import RevenueChart from "../components/analytics/ProductivityChart";
import ProductivityChart from "../components/analytics/ProductivityChart";

const userStats = {
  year: "9.4%",
  quater: "10.4%",
  month: "9.4%",
  week: "2.4%",
};

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Productivity" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="This Year"
            icon={UsersIcon}
            value={userStats.year}
            color="#6366F1"
          />
          <StatCard
            name="This Quarter"
            icon={UserPlus}
            value={userStats.quater}
            color="#10B981"
          />
          <StatCard
            name="This Month"
            icon={UserCheck}
            value={userStats.month}
            color="#F59E0B"
          />
          <StatCard
            name="This Week"
            icon={UserX}
            value={userStats.week}
            color="#EF4444"
          />
        </motion.div>
        <ProductivityChart />
        {/* USER CHARTS */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <RevenueChart />
        </div> */}
      </main>
    </div>
  );
};
export default UsersPage;
