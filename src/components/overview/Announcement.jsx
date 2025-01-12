import { motion } from "framer-motion";

const Announcement = () => {
  const annoucement = [
    {
      id: 1,
      title: "Holiday Notice",
      message: "Office will be closed on Monday.",
    },
    {
      id: 2,
      title: "New Feature Alert",
      message: "Check out the new dashboard view now available!",
    },
  ];

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900">Announcements</h2>
      <div className="border-t border-gray-300 mb-4"></div>

      {annoucement.length > 0 ? (
        <ul className="space-y-4">
          {celebration.map((item) => (
            <li key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">
          No announcements at the moment. Check back later!
        </p>
      )}
    </motion.div>
  );
};

export default Announcement;
