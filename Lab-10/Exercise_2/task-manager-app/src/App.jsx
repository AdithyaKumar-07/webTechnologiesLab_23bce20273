import React, { useState } from 'react';

// Sub-component for individual items to ensure separation of display logic
const ListItem = ({ item, onRemove }) => (
  <li style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
    <span>{item.text}</span>
    <button 
      onClick={() => onRemove(item.id)} 
      style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
    >
      Remove
    </button>
  </li>
);

const TaskManager = () => {
  // 1. State Management (Array State)
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 2. Add Item Logic
  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(), // Unique identifier for React keys
      text: inputValue.trim()
    };

    setTasks([...tasks, newTask]); // Functional state update
    setInputValue(''); // Reset input field
  };

  // 3. Remove Item Logic
  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h3>My Task List</h3>

      {/* Input Logic Section */}
      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '5px' }}>Add</button>
      </form>

      {/* List Logic & Conditional Rendering */}
      {tasks.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No tasks available. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <ListItem 
              key={task.id} // Essential for React reconciliation
              item={task} 
              onRemove={removeTask} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
