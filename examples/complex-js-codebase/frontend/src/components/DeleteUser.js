import React, { useState } from 'react';
import { deleteUser } from '../services/userService';
import "./DeleteUser.css";

const DeleteUser = () => {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    await deleteUser(id);
    setId('');
  };

  return (
    <div className="delete-user-form">
      <h2>Delete User</h2>
      <label>
        User ID:
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </label>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
