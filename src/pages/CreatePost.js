import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({ name: "", nickname: "", speed: 0 });

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

    console.log("Submitting post:", post);

    const { data, error } = await supabase
      .from("Posts")
      .insert({
        name: post.name,
        nickname: post.nickname,
        speed: post.speed,
      })
      .select();

    if (error) {
      console.error("Error creating post:", error);
    } else {
      console.log("Post created successfully:", data);
      window.location = "/";
    }
  };

  return (
    <div>
      <form onSubmit={createPost}>
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
        <br />
        <label for="speed">Speed</label>
        <div>
          {[...Array(3).keys()].map((num) => (
            <label key={num + 1}>
              {num + 1}
              <input
                type="radio"
                name="speed"
                value={num + 1}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;
