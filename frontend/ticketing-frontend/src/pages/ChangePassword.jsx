import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { HiQuestionMarkCircle } from "react-icons/hi";

const ChangePassword = () => {
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (NewPassword !== confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/account/change-my-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          OldPassword,
          NewPassword,
        }),
      });

      if (res.ok) {
        toast.success("Password changed successfully!");
        navigate("/");
      } else {
        const errorData = await res.json();
        if (errorData["PasswordMismatch"])
        {
            toast.error("Incorrect old password");
        } else if (res.status == 403)
        {
            toast.error("New password does not meet complexity requirements");
        }
        
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while changing the password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Change Password</h1>
          <div className="ml-2 relative group">
            <HiQuestionMarkCircle
              size={25}
              className="text-gray-500 cursor-default relative z-10"
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-700 text-white text-sm rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0">
              A secure password should contain at least 12 characters, including uppercase, lowercase, numbers, and special characters.
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={OldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={NewPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
