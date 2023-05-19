import React, { useEffect } from "react";
import { useState } from "react";
import LikeButton from "./LikeButton.js";
import DislikeButton from "./DislikeButton.js";
import { addLikeToPost } from "../api/QuestionsAPI.js";

export default function VoteSystem({ post }) {
  const [voteCount, setVoteCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    setVoteCount(post.likes || 0); // Set initial voteCount with post.likes or default to 0
  }, [post.likes]);

  async function likePost() {
    let voteNumber = await addLikeToPost(post.id, 1);
    setVoteCount(voteNumber);
  }

  async function dislikePost() {
    let voteNumber = await addLikeToPost(post.id, -1);
    setVoteCount(voteNumber);
  }

  return (
    <>
      <LikeButton vote={likePost} />
      <DislikeButton vote={dislikePost} />
      <h3>Count: {voteCount}</h3>
    </>
  );
}
