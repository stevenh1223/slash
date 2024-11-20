import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: null,
    oldMajor: "",
    newMajor: "",
    oldSchool: "",
    newSchool: "",
    motive: "",
    challenge: "",
    advice: "",
    more: "",
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
        oldSchool: post.oldSchool,
        newSchool: post.newSchool,
        motive: post.motive,
        challenge: post.challenge,
        advice: post.advice,
        more: post.more,
      })
      .eq("id", id);

    navigate(`/post/${id}`);
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    navigate(`/post/${id}`);
  };

  return (
    <div>
      <form onSubmit={updatePost}>
        <label for="oldMajor" className="required">
          Original Major
        </label>
        <br />
        <input
          type="text"
          id="oldMajor"
          name="oldMajor"
          placeholder="e.g., Medicine"
          value={post.oldMajor}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="oldSchool" className="required">
          School - Degree
        </label>
        <br />
        <input
          type="text"
          id="oldSchool"
          name="oldSchool"
          placeholder="e.g., Taipei Medical University - MD"
          value={post.oldSchool}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="newMajor" className="required">
          New Major
        </label>
        <br />
        <input
          type="text"
          id="newMajor"
          name="newMajor"
          placeholder="e.g., Computer Science"
          value={post.newMajor}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="newSchool" className="required">
          School - Degree
        </label>
        <br />
        <input
          type="text"
          id="newSchool"
          name="newSchool"
          placeholder="e.g., Columbia University - MS"
          value={post.newSchool}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="motive" className="required">
          Motivation for Change
        </label>
        <br />
        <textarea
          id="motive"
          name="motive"
          rows="5"
          cols="50"
          placeholder="Briefly explain why you decided to switch majors or schools (e.g., career goals, personal passion, new interests)."
          value={post.motive}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="challenge" className="required">
          Challenges Encountered
        </label>
        <br />
        <textarea
          id="challenge"
          name="challenge"
          rows="5"
          cols="50"
          placeholder="Describe any difficulties you faced during the transition (e.g., academic requirements, financial constraints, personal struggles)."
          value={post.challenge}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="advice" className="required">
          Advice for Others
        </label>
        <br />
        <textarea
          id="advice"
          name="advice"
          rows="5"
          cols="50"
          placeholder="Share any tips or suggestions for students considering a similar change (e.g., research, networking, self-care)."
          value={post.advice}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label for="more">More to Share</label>
        <br />
        <textarea
          id="more"
          name="more"
          rows="5"
          cols="50"
          placeholder="Add any additional comments, resources, or stories you would like to include."
          value={post.more}
          onChange={handleChange}
        />
        <br />
        <br />

        <input type="submit" value="Edit" />
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;
