import { motion } from "framer-motion";
import CelebrationList from "./CelebrationList";
import { celebrations } from "../../celebrations";

const Celebration = () => {
  // const celebration = [
  //   {
  //     name: "Odunsi Oluwabukola",
  //     celebration: "Weddig Aniversary",
  //     date: "25-06-12",
  //   },
  // ];
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-900"> Celebrations</h2>
      <div class="h-full border-t border-gray-400 overflow-hidden">
        {celebrations.map((items, index) => {
          <CelebrationList
            key={index}
            name={items.name}
            date={items.date}
            celebration={items.type}
          />;
        })}
      </div>
      {/* <div className="h-80"></div> */}
      <div>hi</div>
    </motion.div>
  );
};
export default Celebration;
