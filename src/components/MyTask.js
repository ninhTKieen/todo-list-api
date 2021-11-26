import React, { useState } from "react";
import TaskInput from "./TaskInput";
import { CgCloseO as CloseIcon } from "react-icons/cg";
import { BiEdit as EditIcon } from "react-icons/bi";
import { AiOutlineFileDone as DoneIcon } from "react-icons/ai";
const MyTask = ({ task, completeTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState({
    id: "",
    name: "",
    content : ""
  });
  const submitUpdate = (newName, newContent) => {
    updateTask(edit.id, {name : newName, content : newContent});
    setEdit({
      id: "",
      text: "",
      content : ""
    });
  };
  if (edit.id) {
    return <TaskInput edit={edit} onChange={submitUpdate} />;
  }
  return (
    <div className="task" key={task.id}>
      <div>
        <DoneIcon className="doneIcon" onClick={() => completeTask(task.id, task.isComplete)} />
      </div>
      <div
        className={task.isComplete ? "taskComplete" : "textTask"}
        key={task.id}
      >
        <p>{task.name}</p>
        <dd>{task.content}</dd>
      </div>

      <div className="icons">
        <CloseIcon className="removeIcon" onClick={() => removeTask(task.id)} />
        <EditIcon
          className="editIcon"
          onClick={() => setEdit({ id: task.id, name: task.name, content : task.content })}
        />
      </div>
    </div>
  );
};

export default MyTask;
