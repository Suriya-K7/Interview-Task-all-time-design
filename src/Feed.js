import React from "react";
import { FaCheck } from "react-icons/fa";
import { profile } from "./assets/index";
import { Link } from "react-router-dom";

const Feed = ({ tasks }) => {
  return (
    <>
      {tasks.map((e, i) => (
        <Link to={`${e.id}`} key={i}>
          <div className="taskList" key={i}>
            <div className="img">
              <img src={profile} alt="..." />
            </div>
            <div className="taskBody">
              <div className="taskTitle">{e.task}</div>
              <div className="taskTime">
                {e.date} at {e.time}
              </div>
            </div>
            <button className="tick">
              <FaCheck />
            </button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Feed;
