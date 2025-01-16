import { motion } from "framer-motion";
import { useAnnouncementContext } from "../hooks/useAnnouncementContext";
import PinUnpin from "./Pin";
import { useState } from "react";

const Announcement = () => {
  const { annoucements } = useAnnouncementContext();
  const annoucement = [
    {
      id: 1,
      title: "Resumption Notice",
      message: "Happy New Year! 🎉 Office Resumes Jan 9.",
    },
    {
      id: 2,
      title: "Dashboard Alert",
      message: "Regular Updates will be made on the Dashboard",
    },
    {
      id: 3,
      title: "Dashboard Alert",
      message: "Regular Updates will be made on the Dashboard",
    },
    {
      id: 4,
      title: "Dashboard Alert",
      message: "Regular Updates will be made on the Dashboard",
    },
    {
      id: 5,
      title: "Dashboard Alert",
      message: "Regular Updates will be made on the Dashboard",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  function handlePin() {
    setOpenIndex(openIndex === index ? null : index);
    console.log("It was clicked");
  }

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">Announcements</h2>
      <div className="border-t border-gray-300 mb-4"></div>
      <div className="h-80 overflow-y-auto">
        {annoucements.length > 0 ? (
          <ul className="space-y-4">
            {annoucements.map((item, index) => (
              <li
                key={index}
                className="relative bg-gray-100 p-4 rounded-lg shadow-sm pointer"
                onClick={handlePin}
              >
                {openIndex === index && <PinUnpin />}
                <h3 className="text-md font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            No announcements at the moment. Check back later!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Announcement;
