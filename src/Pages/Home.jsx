import React from "react";
import { useAuth } from "../hooks/useAuth";
import TaskManager from "../Components/TaskManager";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>
      {user ? (
        <TaskManager />
      ) : (
        <p className="mt-4">Please sign in to manage your tasks❕</p>
      )}
    </div>
  );
};

export default Home;
