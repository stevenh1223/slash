import React from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    name: "",
    nickname: "",
    speed: 0,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data: postData, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(postData);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({ name: post.name, nickname: post.nickname, speed: post.speed })
      .eq("id", id);

    window.location = "/";
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "http://localhost:3000/";
  };

  return (
    <div>
      <form>
        <label for="name">Name</label> <br />
        <input
          type="text"
          id="name"
          name="name"
          value={post.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label for="nickname">Nickname</label>
        <br />
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={post.nickname}
          onChange={handleChange}
        />
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
        <input type="submit" value="Edit" onClick={updatePost} />
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;
