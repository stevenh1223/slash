import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostDetail from "./pages/PostDetail";

const App = () => {
  const [posts, setPosts] = useState([]);
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
    {
      path: "/post/:id",
      element: <PostDetail data={posts} />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>Slash</h1>
        <p>Sharing Grad School Major Transfer Experiences After Bachelor's</p>
        <Link to="/">
          <button className="headerBtn"> all posts </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> create post </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
