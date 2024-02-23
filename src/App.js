import React, { useState } from 'react';
import Timer from './Components/Timer';
import TaskModal from './Components/TaskModal';
import { Button } from 'react-bootstrap';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({});

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const addTask = () => {
    setCurrentTask({});
    setModalShow(true);
  };

  const saveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setModalShow(true);
  };

  return (
    <div className="container mt-5">
      <h1 className>Time Tracker</h1>
      <Timer onStart={startTimer} onPause={pauseTimer} isRunning={isRunning} />
      <Button variant="primary" onClick={addTask} disabled={isRunning}>
        Add Task
      </Button>
      {tasks.map((task) => (
        <div key={task.id}>
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <Button variant="link" onClick={() => editTask(task)}>Edit</Button>
        </div>
      ))}
      <TaskModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={saveTask}
        task={currentTask}
      />
    </div>
  );
};

export default App;
