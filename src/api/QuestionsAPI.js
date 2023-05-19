const BASE_URL = "http://localhost:3030";

export async function getPosts(offset = 0, limit = 12) {
  return fetch(`${BASE_URL}/posts`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("ERROR");
    })
    .catch((error) => {
      console.error(`Problame with fetch. ERROR: ${error}`);
    });
}

export async function addPost(title, body, author) {
  const url = `${BASE_URL}/posts`;
  const data = {
    title,
    body,
    author,
    isEdited: false,
    likes: 0,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      let result = await response.json();
      if (result.title) {
        return true;
      }
      return false;
    } else {
      throw new Error("Error adding new post");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function addLikeToPost(postId, count) {
  const url = `${BASE_URL}/posts/${postId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const post = await response.json();
      const currentLikes = post.likes || 0;
      const updatedLikes = currentLikes + count;

      const data = {
        likes: updatedLikes,
      };

      const patchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const patchResponse = await fetch(url, patchOptions);
      if (patchResponse.ok) {
        const updatedPost = await patchResponse.json();
        return updatedPost.likes;
      } else {
        throw new Error("Error adding like to post");
      }
    } else {
      throw new Error("Error retrieving post by ID");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function getPostById(postId) {
  const url = `${BASE_URL}/posts/${postId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const post = await response.json();
      return post;
    } else {
      throw new Error("Error retrieving post by ID");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function deletePostById(postId) {
  const url = `${BASE_URL}/posts/${postId}`;

  try {
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      return true;
    } else {
      throw new Error("Error deleting post");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
    return false;
  }
}

export async function updatePostById(postId, title, body, author, likes) {
  console.log(` ide we send ${postId}`);
  const url = `${BASE_URL}/posts/${postId}`;
  const data = {
    title,
    body,
    isEdited: true,
    author,
    likes,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const updatedPost = await response.json();
      return updatedPost;
    } else {
      throw new Error("Error updating post");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function fetchComments(postId) {
  const url = `${BASE_URL}/comments?postId=${postId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const comments = await response.json();
      return comments;
    } else {
      throw new Error("Error fetching comments");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function getAuthorByCommentId(commentId) {
  const url = `${BASE_URL}/comments/${commentId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const comment = await response.json();
      const postId = comment.postId;

      const postsUrl = `${BASE_URL}/posts/${postId}`;
      const postsResponse = await fetch(postsUrl);
      if (postsResponse.ok) {
        const post = await postsResponse.json();
        const author = post.author;
        return author;
      } else {
        throw new Error("Error retrieving post");
      }
    } else {
      throw new Error("Error retrieving comment");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}

export async function addComment(body, postId, profileName) {
  const url = `${BASE_URL}/comments`;
  const data = {
    body,
    postId,
    profileName,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      let result = await response.json();
      if (result.body) {
        return result;
      } else {
        throw new Error("Error adding new comment");
      }
    } else {
      throw new Error("Error adding new comment");
    }
  } catch (error) {
    console.error(`Problem with fetch. Error: ${error}`);
  }
}
