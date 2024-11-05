import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({ name: "", nickname: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .insert({
        name: post.name,
        nickname: post.nickname,
      })
      .select();

    window.location = "/";
  };

  return (
    <div>
      <form>
        <label for="name">Name</label> <br />
        <input type="text" id="name" name="name" onChange={handleChange} />
        <br />
        <br />
        <label for="nickname">Nickname</label>
        <br />
        <input
          type="text"
          id="nickname"
          name="nickname"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreatePost;
