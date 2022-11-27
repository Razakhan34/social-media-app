import axios from "axios";
import { postActions } from "../slices/postSlices";
import {
  allUsersActions,
  postsOfFollowingActions,
  userActions,
  userFeatureActions,
  userProfileActions,
} from "../slices/userSlices";

export const userLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(userActions.userRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/users/login",
        { email, password },
        config
      );
      if (data.success) {
        dispatch(userActions.loginSucess(data.user));
      }
    } catch (error) {
      dispatch(userActions.userFail(error.response.data.message));
    }
  };
};

export const userRegister = (userData) => {
  return async (dispatch) => {
    dispatch(userActions.userRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/users/register",
        userData,
        config
      );
      if (data.success) {
        dispatch(userActions.registerSuccess(data.user));
      }
    } catch (error) {
      dispatch(userActions.userFail(error.response.data.message));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(userActions.userRequest());
    try {
      const { data } = await axios.get("/api/v1/users/logout");
      if (data.success) {
        dispatch(userActions.logoutSuccess());
      }
    } catch (error) {
      dispatch(userActions.logoutFail(error.response.data.message));
    }
  };
};

export const userLoad = () => {
  return async (dispatch) => {
    dispatch(userActions.userRequest());
    try {
      const { data } = await axios.get("/api/v1/users/me");
      if (data.success) {
        dispatch(userActions.loadSuccess(data.user));
      }
    } catch (error) {
      dispatch(userActions.userFail(error.response.data.message));
    }
  };
};

export const getPostsOfFollowing = () => {
  return async (dispatch) => {
    dispatch(postsOfFollowingActions.postOfFollowinRequest());
    try {
      const { data } = await axios.get("/api/v1/posts/followingPosts");
      if (data.success) {
        dispatch(postsOfFollowingActions.postOfFollowinSuccess(data.posts));
      }
    } catch (error) {
      dispatch(
        postsOfFollowingActions.postOfFollowinFail(error.response.data.message)
      );
    }
  };
};
export const getAllUsers = (name = "") => {
  return async (dispatch) => {
    dispatch(allUsersActions.allUsersRequest());
    try {
      const { data } = await axios.get(
        `/api/v1/users/usersByName?name=${name}`
      );
      if (data.success) {
        dispatch(allUsersActions.allUsersSuccess(data.users));
      }
    } catch (error) {
      dispatch(allUsersActions.allUsersFail(error.response.data.message));
    }
  };
};
export const userUpdateProfile = (userData) => {
  return async (dispatch) => {
    dispatch(userFeatureActions.userFeatureRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(
        `/api/v1/users/updateMyProfile`,
        userData,
        config
      );
      if (data.success) {
        dispatch(userFeatureActions.updateProfileSuccess(data.message));
      }
    } catch (error) {
      dispatch(userFeatureActions.userFeatureFail(error.response.data.message));
    }
  };
};

export const userUpdatePassword = (userData) => {
  return async (dispatch) => {
    dispatch(userFeatureActions.userFeatureRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(
        `/api/v1/users/updateMyPassword`,
        userData,
        config
      );
      if (data.success) {
        dispatch(userFeatureActions.updatePasswordSuccess(data.message));
      }
    } catch (error) {
      dispatch(userFeatureActions.userFeatureFail(error.response.data.message));
    }
  };
};
export const userForgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(userFeatureActions.userFeatureRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/v1/users/forgotPassword`,
        { email },
        config
      );
      if (data.success) {
        dispatch(userFeatureActions.forgotPasswordSuccess(data.message));
      }
    } catch (error) {
      dispatch(userFeatureActions.userFeatureFail(error.response.data.message));
    }
  };
};
export const userResetPassword = (token, password) => {
  return async (dispatch) => {
    dispatch(userFeatureActions.userFeatureRequest());
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        { password },
        config
      );
      if (data.success) {
        dispatch(userFeatureActions.resetPasswordSuccess(data.message));
      }
    } catch (error) {
      dispatch(userFeatureActions.userFeatureFail(error.response.data.message));
    }
  };
};
export const getUserProfile = (id) => {
  return async (dispatch) => {
    dispatch(userProfileActions.userProfileRequest());
    try {
      const { data } = await axios.get(`/api/v1/users//userProfile/${id}`);

      if (data.success) {
        dispatch(userProfileActions.userProfileSuccess(data.user));
      }
    } catch (error) {
      dispatch(userProfileActions.userProfileFail(error.response.data.message));
    }
  };
};
export const followAndUnfollowUser = (userId) => {
  return async (dispatch) => {
    dispatch(postActions.postRequest());
    try {
      const { data } = await axios.get(`/api/v1/users//follow/${userId}`);

      if (data.success) {
        dispatch(postActions.followAndUnFollowSuccess(data.message));
      }
    } catch (error) {
      dispatch(postActions.postFail(error.response.data.message));
    }
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    dispatch(userActions.userRequest());
    try {
      const { data } = await axios.delete(`/api/v1/users/deleteMe`);
      if (data.success) {
        dispatch(userActions.deleteUserSuccess());
      }
    } catch (error) {
      dispatch(userActions.userFail(error.response.data.message));
    }
  };
};

export const clearUserError = () => {
  return (dispatch) => {
    dispatch(userActions.clearUserError());
  };
};
export const clearPostsOfFollowingError = () => {
  return (dispatch) => {
    dispatch(postsOfFollowingActions.clearError());
  };
};
export const clearAllUsersError = () => {
  return (dispatch) => {
    dispatch(allUsersActions.clearError());
  };
};

export const clearUserFeatureError = () => {
  return (dispatch) => {
    dispatch(userFeatureActions.clearError());
  };
};

export const clearUserFeatureMessage = () => {
  return (dispatch) => {
    dispatch(userFeatureActions.clearMessage());
  };
};

export const clearUserProfileError = () => {
  return (dispatch) => {
    dispatch(userProfileActions.clearError());
  };
};
