import React, { useState } from "react";
import "./css/EditModal.css";

export default function EditModal({ post, handleSaveChanges, handleCloseModal }) {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setEditedBody(e.target.value);
  };

  const handleSave = () => {
    handleSaveChanges(editedTitle, editedBody);
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <input type="text" value={editedTitle} onChange={handleTitleChange} />
        <textarea value={editedBody} onChange={handleBodyChange} />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
