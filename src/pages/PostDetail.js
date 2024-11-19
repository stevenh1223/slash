import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
        setCount(postData.vote); // Initialize count with post.vote
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentsData, error } = await supabase
        .from("Comments")
        .select("*")
        .eq("post_id", id);

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(commentsData);
      }
    };

    fetchComments();

    const commentsSubscription = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Comments",
          filter: `post_id=eq.${id}`,
        },
        (payload) => {
          setComments((prevComments) => [...prevComments, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentsSubscription);
    };
  }, [id]);

  const updateCount = async (event) => {
    event.preventDefault();

    // Optimistically update the count
    setCount((prevCount) => prevCount + 1);

    // Make the API call to update the vote count in the database
    const { error } = await supabase
      .from("Posts")
      .update({ vote: count + 1 })
      .eq("id", id);

    if (error) {
      // If there's an error, revert the count
      setCount((prevCount) => prevCount - 1);
      console.error("Error updating vote count:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("Comments")
      .insert([{ post_id: id, content: newComment }]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment(""); // Clear the input field
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PostDetail">
      <h1>
        {post.oldMajor} to {post.newMajor}
      </h1>
      <p>
        <strong>Old School:</strong> {post.oldSchool}
      </p>
      <p>
        <strong>New School:</strong> {post.newSchool}
      </p>
      <p>
        <strong>Motivation:</strong> {post.motive}
      </p>
      <p>
        <strong>Challenges:</strong> {post.challenge}
      </p>
      <p>
        <strong>Advice:</strong> {post.advice}
      </p>
      <p>
        <strong>More:</strong> {post.more}
      </p>
      <Link to={`/edit/${id}`}>
        <button
          style={{
            margin: "0",
            color: "blue",
            backgroundColor: "lightgray",
            padding: "5px",
          }}
        >
          edit or delete post
        </button>
      </Link>
      <p>
        <strong>Posted:</strong> {new Date(post.created_at).toLocaleString()}
      </p>
      <button onClick={updateCount}>{"👍 Vote: " + count}</button>

      <div className="comments">
        <h1>Comments</h1>
        {comments.map((comment) => (
          <p key={comment.id}>{"- " + comment.content}</p>
        ))}
        <br />
        <form onSubmit={addComment}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            rows="3"
            cols="40"
          />
          <br />
          <button className="commentSubmit" type="submit">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
