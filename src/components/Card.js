import React from "react";
import { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="Card">
      <Link to={"edit/" + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="name">{"Name: " + props.name}</h2>
      <h3 className="nickname">{"Nickname: " + props.nickname}</h3>
      <h3 className="speed">{"Speed(mph): " + props.speed}</h3>
    </div>
  );
};

export default Card;
