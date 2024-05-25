import React, { useState, ChangeEvent } from 'react';
import { deleteUser } from '../services/userService';
import "./DeleteUser.css";

const DeleteUser: React.FC = () => {
  const [id, setId] = useState<string>('');

  const handleDelete = async (): Promise<void> => {
    await deleteUser(id);
    setId('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setId(e.target.value);
  };

  return (
    <div className="delete-user-form">
      <h2>Delete User</h2>
      <label>
        User ID:
        <input
          type="text"
          value={id}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;