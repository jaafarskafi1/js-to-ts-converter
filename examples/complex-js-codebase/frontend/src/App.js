import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`
      );
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const refreshUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    setUsers(response.data);
  };

  return (
    <div className="App">
      <UserList users={users} />
      <AddUser refreshUsers={refreshUsers} />
      <DeleteUser />
    </div>
  );
}

export default App;
