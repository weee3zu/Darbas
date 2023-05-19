import React, { useState } from "react";
import "./css/LikeDislikeButton.css";

export default function LikeButtonCompoent({vote}) {

   const [isLike, setIsLike] = useState(false);

  return (
    <>
      <button
        className={"likeDislike-button " + (isLike ? "likedDisliked" : "")}
        onClick={vote}
      >
        Like
      </button>
    </>
  );
};