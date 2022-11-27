import { Button, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMyPosts,
  getAllPostOfUser,
  postCommentDelete,
} from "../../store/actions/postActions";
import { getPostsOfFollowing } from "../../store/actions/userActions";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { userID: userProfileId } = useParams();

  const deleteCommentHandler = async () => {
    await dispatch(postCommentDelete(postId, commentId));

    if (userProfileId) {
      dispatch(getAllPostOfUser(userProfileId));
    } else if (isAccount) {
      dispatch(getAllMyPosts());
    } else {
      dispatch(getPostsOfFollowing());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
