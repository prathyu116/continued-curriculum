import React from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchData = () => {
    axios("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        if (response.data) {
          const tasksArray = Object.values(response.data);
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.log("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={task.id || index}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
