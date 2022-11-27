import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post.js";
import User from "../user/User.js";
import toast from "react-hot-toast";

import "./Home.css";
import {
  clearAllUsersError,
  clearPostsOfFollowingError,
  getAllUsers,
  getPostsOfFollowing,
} from "../../store/actions/userActions.js";
import { Typography } from "@mui/material";
import Loader from "../loader/Loader.js";
import {
  clearPostError,
  clearPostMessage,
} from "../../store/actions/postActions.js";

const Home = () => {
  const dispatch = useDispatch();
  const { error, loading, posts } = useSelector(
    (state) => state.postOfFollowing
  );
  const {
    error: allUsersError,
    loading: allUsersLoading,
    users,
  } = useSelector((state) => state.allUser);

  const { message, error: postError } = useSelector((state) => state.post);

  useEffect(() => {
    if (error || allUsersError) {
      toast.error("something went wrong");
      dispatch(clearPostsOfFollowingError());
      dispatch(clearAllUsersError());
    }
    dispatch(getPostsOfFollowing());
    dispatch(getAllUsers());
  }, [dispatch, error, allUsersError]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearPostMessage());
    }
    if (postError) {
      toast.error(postError);
      dispatch(clearPostError());
    }
  }, [dispatch, postError, message]);

  return loading === true || allUsersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && User.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
