import { useState } from 'react';
import './App.css';

function initialTodosFunction() {
  const initialTodos = [];
  for (let i = 0; i < 3; i++) {
    initialTodos.push({
      id: i,
      text: 'Task ' + (i + 1),
      completed: false,
    });
  }
  return initialTodos;
}

function App() {
  const [tasks, setTasks] = useState(initialTodosFunction);
  const [text, setText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function addTask(e) {
    if (editMode) {
      // Update the task
      setTasks(tasks.map(task => 
        task.id === currentTaskId ? { ...task, text: text } : task
      ));
      setEditMode(false);
      setCurrentTaskId(null);
    } else {
      // Add new task
      setTasks([
        ...tasks,
        { id: tasks.length + 1, text: text, completed: false }
      ]);
    }
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setText(taskToEdit.text);
      setEditMode(true);
      setCurrentTaskId(id);
    }
  }

  function toggleStrikeThrough(e, taskId) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: e.target.checked } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="appBody">
      <div className="header bg-primary">
        <h1>Task Master</h1>
        <h3 className="">Keep track of your daily tasks with ease</h3>
      </div>
      <div className="body">
        <input
          type="text"
          placeholder="Add a new Task"
          id="inputField"
          className="inputBar py-2 bg-light"
          value={text}
          onChange={handleChange}
        />
        <button onClick={addTask} className="btn addBtn">
          {editMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="list">
        {tasks.map(item => (
          <li key={item.id} className="d-flex item">
            <div>
              <span
                className={item.completed ? 'text-decoration-line-through' : ''}
              >
                {item.text}
              </span>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => toggleStrikeThrough(e, item.id)}
              />
            </div>
            <div className="d-flex taskBtn">
              <button
                onClick={() => deleteTask(item.id)}
                className="btn"
              >
                ❌
              </button>
              <button
                onClick={() => editTask(item.id)}
                className="text-primary-emphasis btn"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
main.js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <!-- Bootstrap CSS link -->
     <link rel="stylesheet"
     href=
"https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
     integrity=
"sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
     crossorigin="anonymous">
    <title>Todo webAp   p</title>  
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <!-- Bootstrap script files -->
    <script src=
"https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity=
"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous">
      </script>

    <script src=
"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
            integrity=
"sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
            crossorigin="anonymous">
      </script>

    <script src=
"https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
            integrity=
"sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
            crossorigin="anonymous">
      </script>
  </body>
</html>
