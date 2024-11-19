import React from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    oldMajor: "",
    newMajor: "",
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
      .update({
        oldMajor: post.oldMajor,
        newMajor: post.newMajor,
      })
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
        <label for="oldMajor">Original Major</label> <br />
        <input
          type="text"
          id="oldMajor"
          name="oldMajor"
          value={post.oldMajor}
          onChange={handleChange}
        />
        <br />
        <br />
        <label for="newMajor">New Major</label>
        <br />
        <input
          type="text"
          id="newMajor"
          name="newMajor"
          value={post.newMajor}
          onChange={handleChange}
        />
        <br />
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
