import React, { useState, useEffect, useRef } from "react";

const TaskInput = (props) => {
  const [titleInput, setTitleInput] = useState(props.edit ? props.edit.name : "");
  const [desInput, setDesInput] = useState(props.edit ? props.edit.content : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleChange = (e) => {
    setTitleInput(e.target.value);
  };
  const handleAddTask = (e) => {
    e.preventDefault(); //prevent refresh the page after click add button
    props.onChange(titleInput,desInput);
    setTitleInput("");
    setDesInput("");
  };
  return (
    <form className="task_form" onSubmit={handleAddTask}>
      {!props.edit ? (
        <>
          <input
            type="text"
            placeholder="Add a task"
            value={titleInput}
            name="text"
            className="task_input"
            onChange={val => setTitleInput(val.target.value)}
            ref={inputRef}
          />
          <textarea
            type = "text"
            placeholder="Write a content"
            value={desInput}
            name ="content"
            onChange={val => setDesInput(val.target.value)}
            className="task_content"
          />
          <button className="task_button" onClick={handleAddTask}>
            Add Task
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={titleInput}
            name="text"
            className="task_input_edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <textarea
            type = "text"
            placeholder="Write a new content"
            value={desInput}
            name ="content"
            onChange={val => setDesInput(val.target.value)}
            className="task_input_edit"
          />
          <button className="task_button_edit" onClick={handleAddTask}>
            Update task
          </button>
        </>
      )}
    </form>
  );
};

export default TaskInput;
