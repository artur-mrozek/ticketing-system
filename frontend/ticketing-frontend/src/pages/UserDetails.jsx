import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';

const UserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const { username } = useParams();
  const availableRoles = ['User', 'L1', 'L2', 'L3', 'Admin'];

  const getUser = async () => {
    try {
        const res = await fetch(`/api/account/${username}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`
        }
        })

        if (res.ok)
        {
          const data = await res.json();
          setUser(data);
        } else {
            toast.error("User not found")
            navigate(-1)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  }

  const handleAddRole = async () => {
    if (!newRole) {
      toast.warning('Please select a role');
      return;
    }
    try {
      const res = await fetch(`/api/account/add-role-to-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(
            { 
                Username: user.username,
                Role: newRole
            }
        ),
      });

      if (res.ok) {
        toast.success('Role added successfully');
        getUser();
        setNewRole('');
      } else {
        toast.error('Failed to add role');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding role');
    }
  };

  const handleRemoveRole = async (role) => {
    try {
      const res = await fetch(`/api/account/remove-role-from-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(
            { 
                Username: user.username,
                Role: role
            }
        ),
      });

      if (res.ok) {
        toast.success('Role removed successfully');
        getUser();
      } else {
        toast.error('Failed to remove role');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing role');
    }
  };

  const handleResetPassword = () => {
    setShowModal(true); // Otwiera modal
  };

  const handleSubmitNewPassword = async () => {
    if (!newPassword) {
      toast.warning('Please enter a new password');
      return;
    }
    try {
      const res = await fetch(`/api/account/reset-user-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify
        (
            { 
                Username: user.username,
                NewPassword: newPassword 
            }
        ),
      });

      if (res.ok) {
        toast.success('Password reset successfully');
        setShowModal(false); // Zamknij modal
        setNewPassword(''); // Resetuj pole hasła
      } else {
        if (res.status == 403)
        {
            toast.error('Password does not meet complexity requirements');
        } else {
            toast.error('Failed to reset password');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Error resetting password');
    }
  };

  useEffect(() => {
    getUser();
  },[])
  
  return (
    <>
    {loading
    ? <Spinner loading={loading} />
    :
    <div className="pt-24 px-6">
  <div className="bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">User Details</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* Kolumna 1 */}
      <div>
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div>
        <strong>ID:</strong> {user.id}
      </div>
      <div>
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Address:</strong> {user.address}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Phone Number:</strong> {user.phoneNumber}
      </div>
    </div>

    <h2 className="text-xl font-semibold text-gray-700 mb-4">Roles</h2>
    <ul className="space-y-2">
      {user.roles?.map((role) => (
        <li key={role} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
          <span>{role}</span>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => handleRemoveRole(role)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>

    <div className="mt-6 flex items-center space-x-3">
      <select
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Role</option>
        {availableRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button
        className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        onClick={handleAddRole}
      >
        Add Role
      </button>
    </div>

    <button
      className="mt-6 px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      onClick={handleResetPassword}
    >
      Reset Password
    </button>
  </div>
  {/* Modal for Reset Password */}
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            onClick={handleSubmitNewPassword}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )}
</div>
    }
</>
  );
}

export default UserDetails