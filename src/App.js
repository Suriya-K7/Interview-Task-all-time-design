import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./NewTask";
import Tasks from "./Tasks";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import EditTask from "./EditTask";

function App() {
  let [tasks, setTasks] = useState([]);
  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        task: "react",
        date: "2023-06-16",
        time: "8:00 AM",
        user: "one",
      },
      {
        id: 2,
        task: "Angular",
        date: "2023-06-16",
        time: "8:00 AM",
        user: "one",
      },
      {
        id: 3,
        task: "web development",
        date: "2023-06-16",
        time: "8:00 AM",
        user: "one",
      },
    ];
    setTasks(localStorageData);
  }, []);
  let [newTask, setNewTask] = useState("");
  let [newDate, setNewDate] = useState("");
  let [newTime, setNewTime] = useState("");
  let [assignUser, setAssignUser] = useState("");
  let [editTask, setEditTask] = useState("");
  let [editDate, setEditDate] = useState("");
  let [editTime, setEditTime] = useState("");
  let [editUser, setEditUser] = useState("");
  let navigator = useNavigate();
  let handleCancel = () => {
    setNewDate("");
    setNewTask("");
    setNewTime("");
    setAssignUser("");
    navigator("/");
  };
  let handleSubmit = () => {
    let id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    if (newTask === "" || newDate === "" || newTime === "Time") {
      alert("Kindly fill all inputs");
    } else {
      let task = {
        task: newTask,
        date: newDate,
        time: newTime,
        user: assignUser,
        id: id,
      };
      let allTasks = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      setTasks(allTasks);
      setNewTask("");
      setNewDate("");
      setNewTime("");
      setAssignUser("");
      navigator("/");
    }
  };
  let handleUpdate = (id) => {
    if (editTask === "" || editDate === "" || editTime === "Time") {
      alert("Kindly fill all inputs");
    } else {
      let updatedTask = {
        task: editTask,
        date: editDate,
        time: editTime,
        user: editUser,
        id: id,
      };
      let newTask = tasks.map((task) =>
        task.id === id ? { ...updatedTask } : task
      );
      setTasks(newTask);
      localStorage.setItem("tasks", JSON.stringify(newTask));
      setEditTask("");
      setEditDate("");
      setEditTime("");
      setEditUser("");
      navigator("/");
    }
  };
  let handleDelete = (id) => {
    let newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setEditTask("");
    setEditDate("");
    setEditTime("");
    setEditUser("");
    navigator("/");
  };
  return (
    <div className="conatainer">
      <Routes>
        <Route path="/" element={<Tasks />}>
          <Route
            path="/newtask"
            element={
              <NewTask
                newTask={newTask}
                setNewTask={setNewTask}
                newDate={newDate}
                setNewDate={setNewDate}
                newTime={newTime}
                setNewTime={setNewTime}
                assignUser={assignUser}
                setAssignUser={setAssignUser}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
              />
            }
          />
          <Route
            path=":id"
            element={
              <EditTask
                tasks={tasks}
                editTask={editTask}
                setEditTask={setEditTask}
                editDate={editDate}
                setEditDate={setEditDate}
                editTime={editTime}
                setEditTime={setEditTime}
                editUser={editUser}
                setEditUser={setEditUser}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
              />
            }
          />
        </Route>
      </Routes>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
