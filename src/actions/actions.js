
export const updateAuth = ({user,session_id}) => {
  return {
    type: "UPDATE_AUTH",
    payload:{
      user,
      session_id
    }
  };
};

export const onLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const toggleModal = () => {
  return {
    type: "TOGGLE_MODAL",
  }
}

export const updateFavoriteMovies = movies => {
  return {
    type: "UPDATE_FAVORITE_MOVIES",
    payload: movies
  };
};