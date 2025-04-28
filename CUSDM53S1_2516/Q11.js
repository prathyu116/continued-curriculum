import React from 'react'
import { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (username.trim() === "") {
      setError("Username is required!");
    } else {
      setError("");
      alert(`Submitted Username: ${username}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default App
