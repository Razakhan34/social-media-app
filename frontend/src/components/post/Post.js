import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";

import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPostError,
  clearPostMessage,
  deletePost,
  getAllMyPosts,
  getAllPostOfUser,
  postComment,
  postLikeAndDislike,
  updateCaption,
} from "../../store/actions/postActions";
import { getPostsOfFollowing, userLoad } from "../../store/actions/userActions";
import User from "../user/User";
import CommentCard from "../commentCard/CommentCard.js";
import toast from "react-hot-toast";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const dispatch = useDispatch();
  const { userID: userProfileId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { error, message } = useSelector((state) => state.myPost);

  const [liked, setLiked] = useState(false);
  const [openLikeUser, setOpenLikeUser] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    await dispatch(postLikeAndDislike(postId));
    if (userProfileId) {
      dispatch(getAllPostOfUser(userProfileId));
    } else if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowing());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(postComment(postId, commentValue));
    if (userProfileId) {
      dispatch(getAllPostOfUser(userProfileId));
    } else if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowing());
    }
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getAllMyPosts());
    dispatch(userLoad());
  };

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateCaption(postId, captionValue));
    dispatch(getAllMyPosts());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearPostMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearPostError());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    likes.forEach((like) => {
      if (like._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setOpenLikeUser((prev) => !prev)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

      <Dialog
        open={openLikeUser}
        onClose={() => setOpenLikeUser((prev) => !prev)}
      >
        <div className="DialogBox">
          <Typography variant="h6">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments && comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
