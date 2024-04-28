type Post = {
  id: number;
  title: string;
  postText: string;
  username: string;
  likes?: Like[];
};

type NewPost = {
  title: string;
  postText: string;
  username: string;
};

type Like = {
  postId: number;
  username: string;
};

type PostComment = {
  id?: number;
  commentBody: string;
  postId?: number;
  username: string;
};

type User = {
  username: string;
  password: string;
  id?: number;
};
