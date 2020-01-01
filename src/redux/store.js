import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { FETCH_SUCCESS_AUTH, LOGOUT } from "../redux/auth/auth.types";
import { cookies } from "../utils/cookies";

const updateCookies = ({ dispatch, getState }) => next => action => {
  if (action.type === "FETCH_SUCCESS_AUTH") {
    cookies.set("session_id", action.payload.session_id, {
      path: "/",
      maxAge: 2592000
    });
  }
  if (action.type === "LOGOUT") {
    cookies.remove("session_id");
  }
  return next(action);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);