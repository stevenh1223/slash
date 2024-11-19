import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({
    oldMajor: "",
    newMajor: "",
    oldSchool: "",
    newSchool: "",
    motive: "",
    challenge: "",
    advice: "",
    more: "",
    vote: 0,
  });

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
        oldMajor: post.oldMajor,
        newMajor: post.newMajor,
        oldSchool: post.oldSchool,
        newSchool: post.newSchool,
        motive: post.motive,
        challenge: post.challenge,
        advice: post.advice,
        more: post.more,
        vote: post.vote,
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
        <label for="oldMajor" className="required">
          Original Major
        </label>
        <br />
        <input
          type="text"
          id="oldMajor"
          name="oldMajor"
          placeholder="e.g., Medicine"
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
          onChange={handleChange}
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;
