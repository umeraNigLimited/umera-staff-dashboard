import { CameraIcon, User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useImageContext } from "../hooks/useImageContext";
import { useImageUpload } from "../hooks/useImageUpload";

const Profile = () => {
  const { image } = useImageContext();
  const { uploadImage } = useImageUpload();
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Add logic to handle the uploaded file, e.g., upload to a server
    }
    const formData = new FormData();
    formData.append("image", file);
    await uploadImage(formData);
  };

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="relative inline-block group cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
          />
          <img
            src={
              image
                ? image.image_url
                : "https://dummyimage.com/150x150/cccccc/ffffff.png&text=No+Image"
            }
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mr-4 border border-gray-300 group-hover:opacity-80 transition-opacity duration-200"
          />
          <CameraIcon className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-100">Oluwabukola</h3>
          <p className="text-gray-400">example@umera.ng</p>
        </div>
      </div>

      <button className="outline outline-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};

export default Profile;
