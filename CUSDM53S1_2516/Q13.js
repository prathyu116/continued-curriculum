import React, { useRef } from 'react'
import { useState } from 'react';
import Form from './Component/Form';

const App = () => {
  const [emails, setEmails] = useState([""]);

  const handleChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const validateEmail = (email) => {
    // Simple email regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <form>
        {emails.map((email, index) => (
          <div key={index}>
            <input
              type="email"
              placeholder={`Email ${index + 1}`}
              value={email}
              onChange={(e) => handleChange(index, e)}
              style={{
                borderColor: email && !validateEmail(email) ? "red" : "black",
                marginBottom: "8px",
              }}
            />
          </div>
        ))}
        <button type="button" onClick={addEmailField}>
          Add Email
        </button>
      </form>

      <h3>Entered Emails:</h3>
      <ul>
        {emails.map((email, index) => (
          <li
            key={index}
            style={{ color: validateEmail(email) ? "green" : "red" }}
          >
            {email || "(empty)"}
          </li>
        ))}
      </ul>
    </div>
   
  );
}

export default App
