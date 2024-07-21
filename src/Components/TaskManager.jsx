import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleAddTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        text: task,
        completed: false,
      });
      setTask("");
    }
  };

  const handleUpdateTask = async (id, completed) => {
    await updateDoc(doc(db, "tasks", id), { completed });
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Your Tasks</h2>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddTask} className="bg-blue-600 text-white p-2 rounded">Add</button>
      </div>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b border-gray-300">
            <span className={`${task.completed ? "line-through" : ""}`}>{task.text}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleUpdateTask(task.id, !task.completed)} className="text-blue-600">
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;