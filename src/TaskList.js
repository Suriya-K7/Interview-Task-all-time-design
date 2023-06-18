import React from "react";
import Feed from "./Feed";
const TaskList = ({ tasks }) => {
  return (
    <>
      <Feed tasks={tasks} />
    </>
  );
};

export default TaskList;
