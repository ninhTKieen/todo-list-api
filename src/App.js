import React, { useState, useEffect } from "react";
import "./App.css";

import TaskList from "./components/TaskList";

let fakeapi = `https://619254bcaeab5c0017105f61.mockapi.io/tasks`;
const initialState = [{ id: 1, text: "Learn Redux", completed: true }];
function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
