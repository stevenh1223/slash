import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { supabase } from "../client";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("Posts")
        .select()
        .order("id", { ascending: true });

      // set state of posts
      setPosts(data);
    };
    fetchPosts();
  }, [props]);

  return (
    <div className="ReadPosts">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card
            id={post.id}
            timestamp={post.created_at}
            oldMajor={post.oldMajor}
            newMajor={post.newMajor}
            vote={post.vote}
          />
        ))
      ) : (
        <h2>{"No Posts Yet"}</h2>
      )}
    </div>
  );
};

export default ReadPosts;
