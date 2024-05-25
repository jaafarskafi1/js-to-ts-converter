const API_URL = "http://localhost:8000/api/users";

interface User {
  name: string;
  email: string;
  [key: string]: any; // Additional properties if any
}

type UserId = string | number;

export const addUser = async (user: User): Promise<string> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const userId: UserId = await response.json();
  return userId.toString(); // Return user ID as a string
};

export const deleteUser = async (id: string): Promise<any> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};