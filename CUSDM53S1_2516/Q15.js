import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

const firebaseBaseURL = process.env.DB_URL;

const App = () => {
  const [users, setUsers] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${firebaseBaseURL}.json`);
      setUsers(res.data || {});
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validate form
  const isValid = () => {
    if (!formData.name || !formData.email) {
      alert("Both fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format");
      return false;
    }
    return true;
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    try {
      if (editId) {
        await axios.patch(`${firebaseBaseURL}/${editId}.json`, formData);
        setEditId(null);
      } else {
        await axios.post(`${firebaseBaseURL}.json`, formData);
      }
      setFormData({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  // Edit user
  const handleEdit = (id) => {
    setEditId(id);
    setFormData(users[id]);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${firebaseBaseURL}/${id}.json`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>User Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      <ul>
        {Object.entries(users).map(([id, user]) => (
          <li key={id}>
            {user.name} ({user.email}){" "}
            <button onClick={() => handleEdit(id)}>Edit</button>{" "}
            <button onClick={() => handleDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
