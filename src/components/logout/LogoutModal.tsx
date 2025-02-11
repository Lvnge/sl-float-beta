import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

interface LogoutModalProps {
  onClose: () => void;
}
const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Properly sign out the user from Firebase
      console.log("User logged out");

      // Redirect user to login page after logout
      navigate("/login");

      // Close modal
      onClose();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center backdrop-blur-sm z-10">
      <div className="bg-zinc-200 shadow-lg rounded-xl overflow-hidden min-w-[300px] border-1 border-zinc-400/50">
        <div className="bg-zinc-300  p-4 border-b-1 border-zinc-400/50 flex items-center justify-between">
          <h2 className="text-md font-semibold">Log Out?</h2>
          <button onClick={onClose} className="cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m7 7l10 10M7 17L17 7"
              />
            </svg>
          </button>
        </div>
        <div className=" bg-zinc-200 p-4 border-b-1 border-zinc-400/50">
          <p className="text-sm">Log out of your account.</p>
        </div>

        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={onClose}
            className=" w-24 h-7 bg-zinc-200
            border-zinc-400/50 border rounded-md hover:bg-zinc-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-24 h-7 text-white bg-red-700 rounded-md hover:bg-red-800 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
