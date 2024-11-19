import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { supabase } from "../client";
import "./ReadPosts.css";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("created_at");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order(sortCriteria, { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortCriteria]);

  const handleSortByTime = () => {
    setSortCriteria("created_at");
  };

  const handleSortByVotes = () => {
    setSortCriteria("vote");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.oldMajor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.newMajor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ReadPosts">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by major..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="sortButtons">
        <button onClick={handleSortByTime}>Sort by Time</button>
        <button onClick={handleSortByVotes}>Sort by Votes</button>
      </div>
      <div className="posts">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              timestamp={post.created_at}
              oldMajor={post.oldMajor}
              newMajor={post.newMajor}
              vote={post.vote}
            />
          ))
        ) : (
          <h2>No Posts Yet</h2>
        )}
      </div>
    </div>
  );
};

export default ReadPosts;
