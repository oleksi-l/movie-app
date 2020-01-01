import * as types from "./auth.types";
import { cookies } from "../../utils/cookies";

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false,
  showModal: false,
  favoriteMovies: [],
  watchList: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    case types.LOGOUT:
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false
      };
    case types.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    case types.UPDATE_FAVORITE_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload
      };
    case types.UPDATE_WATCHLIST:
      return {
        ...state, watchList: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;