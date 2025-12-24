import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const { user ,logout } = useAuth();

  const handleLogout = () => {
    logout()
  };
  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">My App</div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaRegUserCircle />
          <span>{user && user.name}</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
