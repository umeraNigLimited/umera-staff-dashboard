import { motion } from "framer-motion";
import CelebrationList from "./CelebrationList";
import { celebrations } from "../../celebrations";

const Celebration = () => {
  const celebrations = [
    { id: 1, type: "Birthday", name: "Yemi Olo", date: "Jan 15" },
    { id: 2, type: "Anniversary", name: "Team Project Alpha", date: "Jan 18" },
    { id: 3, type: "Milestone", name: "Company's 10th Year", date: "Jan 20" },
  ];

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">
        Celebrations 🎉
      </h2>
      <div className="border-t border-gray-300 mb-4"></div>
      <div className="h-80 overflow-y-auto">
        {celebrations.length > 0 ? (
          <ul className="space-y-4">
            {celebrations.map((item) => (
              <li
                key={item.id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center space-x-4"
              >
                <div className="flex-shrink-0">
                  {/* Icons or initials */}
                  {item.type === "Birthday" && (
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      🎂
                    </div>
                  )}
                  {item.type === "Anniversary" && (
                    <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">
                      💞
                    </div>
                  )}
                  {item.type === "Milestone" && (
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                      🌟
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.type}: {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">Date: {item.date}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            No celebrations at the moment.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Celebration;
