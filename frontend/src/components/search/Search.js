import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUsersError,
  getAllUsers,
} from "../../store/actions/userActions";
import User from "../user/User";

import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUser);

  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersError());
    }
    dispatch(getAllUsers(name));
  }, [dispatch, error, name]);

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography>
              There is no user exits with <strong>{name}</strong>
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
