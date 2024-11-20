import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="Card">
      <Link to={"post/" + props.id}>
        <div className="cardContent">
          <h2 className="title">
            {"From " + props.oldMajor + " to " + props.newMajor}
          </h2>
          <h3 className="vote">{"👍 votes: " + props.vote}</h3>
          <p className="timestamp">
            {"Posted: " + formatDate(props.timestamp)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
