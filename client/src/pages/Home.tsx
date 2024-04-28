import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([] as Post[]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const likePost = (postId: number) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { postId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } },
      )
      .then((response: AxiosResponse) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, likes: [...post.likes!, {} as Like] };
              } else {
                const likesArray = post.likes;
                likesArray?.pop();
                return { ...post, likes: likesArray };
              }
            } else {
              return post;
            }
          }),
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value: Post, key: number) => {
        return (
          <div className="post" key={key}>
            <div className="title">{value.title}</div>
            <div className="body" onClick={() => navigate(`/post/${value.id}`)}>
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.username} </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  className="likeBttn"
                  onClick={() => likePost(value.id)}
                />
                <ThumbUpAltIcon
                  className="unlikeBttn"
                  onClick={() => likePost(value.id)}
                />
                <label>{value.likes ? value.likes.length : 0}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
