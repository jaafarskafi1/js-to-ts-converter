import React, { useState, FormEvent } from "react";
import { addUser } from "../services/userService";
import "./AddUser.css";

interface AddUserProps {
  refreshUsers: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ refreshUsers }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = { name, email };
    const userId = await addUser(user);
    setUserId(userId);
    setName("");
    setEmail("");
    refreshUsers();
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h2>Add User</h2>
      {userId && <p>User ID: {userId}</p>}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;