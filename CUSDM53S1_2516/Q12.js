import React, { useRef } from 'react'
import { useState } from 'react';

const App = () => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value.trim() !== "") {
      alert(`Entered Text: ${value}`);
      inputRef.current.value = ""; 
    } else {
      alert("Input cannot be empty!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} placeholder="Enter text" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App
