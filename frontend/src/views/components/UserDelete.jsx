import React, { useState } from 'react';
import axios from 'axios';

const UserDelete = ({ userId, isLoggedIn }) => {
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleUserDelete = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
        console.log(response.data);
        // Handle success
        setDeleteStatus('success');
        // Optionally, you can also update the UI or perform additional actions
      } catch (error) {
        console.error(error.response.data);
        // Handle error
        setDeleteStatus('error');
      }
    } else {
      console.log('User not logged in');
    }
  };

  return (
    <div>
      {deleteStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> User deleted successfully.</span>
        </div>
      )}

      {deleteStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Unable to delete user. Please try again.</span>
        </div>
      )}

      <button onClick={handleUserDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-700">Delete User</button>
    </div>
  );
};

export default UserDelete;
