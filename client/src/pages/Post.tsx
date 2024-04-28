import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({} as Post);
  const [comments, setComments] = useState([] as PostComment[]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/byId/${id}`)
      .then((response: AxiosResponse) => {
        setPostObject(response.data);
      });

    axios
      .get(`http://localhost:3001/comments/${id}`)
      .then((response: AxiosResponse) => {
        setComments(response.data);
      });
  }, [id, comments]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          postId: Number(id),
        } as PostComment,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        },
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd: PostComment = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id: number) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          }),
        );
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            autoComplete="off"
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              comment.id && (
                <div key={key} className="comment">
                  {comment.commentBody}
                  <label> Username: {comment.username}</label>
                  {authState.username === comment.username && (
                    <button onClick={() => deleteComment(comment.id!)}>
                      X
                    </button>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
