import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg bg-red-800">
      <ClipLoader size={50} color="#f5f5f5" />
    </div>
  );
}

export default Loader;
