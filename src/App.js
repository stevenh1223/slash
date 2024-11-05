import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Link } from "react-router-dom";

const App = () => {
  const posts = [
    { id: "1", name: "Cartwheel in Chelsea 🤸🏽‍♀️", nickname: "Harvey Milian" },
    { id: "2", name: "Love Lock in Paris 🔒", nickname: "Beauford Delaney" },
  ];

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />,
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />,
    },
    {
      path: "/new",
      element: <CreatePost />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>crewmates</h1>
        <Link to="/">
          <button className="headerBtn"> all crewmates </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> create crewmate </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
