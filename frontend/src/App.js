import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLoad } from "./store/actions/userActions.js";
import Header from "./components/header/Header.js";
import Login from "./components/login/Login.js";
import Home from "./components/home/Home.js";
import Account from "./components/account/Account.js";
import Register from "./components/register/Register.js";
import NewPost from "./components/newpost/NewPost.js";
import UpdateProfile from "./components/updateProfile/UpdateProfile.js";
import UpdatePassword from "./components/updatePassword/UpdatePassword.js";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.js";
import ResetPassword from "./components/forgotPassword/ResetPassword.js";
import UserProfile from "./components/userProfile/UserProfile.js";
import Search from "./components/search/Search.js";
import NotFound from "./components/notfound/NotFound.js";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userLoad());
  }, [dispatch]);

  return (
    <Router>
      <div>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Account /> : <Register />}
          />
          <Route
            path="/newpost"
            element={isAuthenticated ? <NewPost /> : <Login />}
          />
          <Route
            path="/update/profile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="/update/password"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />
          <Route
            path="/forgot/password"
            element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
          />
          <Route
            path="/reset/password/:token"
            element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
          />
          <Route
            path="/user/:userID"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
};

export default App;
