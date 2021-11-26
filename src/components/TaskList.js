import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import MyTask from "./MyTask";
const fakeapi = `https://619254bcaeab5c0017105f61.mockapi.io/tasks`;

const TaskList = () => {
  const [taskItems, setTaskItems] = useState([]);
  
  const fetchAPIData = async () => {
    try {
      const response = await fetch(fakeapi);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTaskItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAPIData();
  }, []);

  const handleAddTask = async (title, content) => {
    await fetch(fakeapi, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        content: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await fetch(fakeapi);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setTaskItems(data);
    }
  };

  const completeTask = async (id, isComplete) => {
    await fetch(fakeapi + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        isComplete: !isComplete,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await fetch(fakeapi);
    if (response.status === 200) {
      const updateTasks = await response.json();
      setTaskItems(updateTasks);
    }
  };

  const removeTask = async (id) => {
    await fetch(fakeapi + `/${id}`, {
      method: "DELETE",
    });
    const response = await fetch(fakeapi);
    if (response.status === 200) {
      const updateTasks = await response.json();
      setTaskItems(updateTasks);
    }
  };

  const updateTask = async (id, newTask) => {
    if (!newTask.name || !newTask.content) {
      return;
    }
    await fetch(fakeapi + `/${id}`, {
      method : "PUT",
      body : JSON.stringify({
        name : newTask.name,
        content : newTask.content,
        isComplete : true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    const response = await fetch(fakeapi);
    if (response.status === 200) {
      const updateTasks = await response.json();
      setTaskItems(updateTasks);
    }
  };
  
  return (
    <div>
      <h1 className="title">Today's Tasks</h1>
      
      <TaskInput onChange={handleAddTask} />
      {taskItems.map((task) => {
        return (
          <MyTask
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
