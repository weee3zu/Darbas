import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";
import { getPostById, updatePostById, fetchComments, getAuthorByCommentId } from "../api/QuestionsAPI.js";
import EditModal from "../components/EditModal.js";
import Comment from "../components/Comment.js"; // Import the Comment component
import AddCommentForm from "./AddCommentForm.js";

export default function SubForumBody() {    
  const { state } = useLocation();
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [comments, setComments] = useState([]); // State for comments

  useEffect(() => {
    if (state && state.id) {
      getPostById(state.id)
        .then((fetchedPost) => {
          setPost(fetchedPost);
        })
        .catch((error) => {
          console.error(`Error fetching post: ${error}`);
        });
    }
  }, [state]);

  useEffect(() => {
    // Fetch comments for the post
    if (post && post.id) {
      fetchComments(post.id)
        .then((fetchedComments) => {
          setComments(fetchedComments);
        })
        .catch((error) => {
          console.error(`Error fetching comments: ${error}`);
        });
    }
  }, [post]);

  const handleSaveChanges = (editedTitle, editedBody) => {

    updatePostById(post.id, editedTitle, editedBody, post.author, post.likes)
      .then((updatedPost) => {
        setPost(updatedPost);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(`Error updating post: ${error}`);
      });
  };

  const refreshComments = () => {
    if (post && post.id) {
      fetchComments(post.id)
        .then((fetchedComments) => {
          setComments(fetchedComments);
        })
        .catch((error) => {
          console.error(`Error fetching comments: ${error}`);
        });
    }
  };
  

  const handleOpenModal = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      {post ? (
        <div>
          <h2>Title: {post.title}</h2>
          <p>Body: {post.body}</p>
          <p>Author: {post.author}</p>
          <p>{post.isEdited ? "Edited" : "Not Edited"}</p>
          <p>Likes: {post.likes}</p>
          {cookies.user === post.author && (
            <button onClick={handleOpenModal}>Edit Post</button>
          )}
        </div>
      ) : (
        <p>Loading post...</p>
      )}
      {isEditing && (
        <EditModal
          post={post}
          handleSaveChanges={handleSaveChanges}
          handleCloseModal={handleCloseModal}
          setEditedTitle={setEditedTitle}
          setEditedBody={setEditedBody}
        />
      )}
  
      {/* Comments */}
      <AddCommentForm postId={post?.id} refreshComments={refreshComments} />
      {/* Comment section */}
      <div>
        <h3>Comments</h3>
        <h1>{post?.id}</h1>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
  }
