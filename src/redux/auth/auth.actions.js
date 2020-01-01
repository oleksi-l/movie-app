import CallApi from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: "FETCH_REQUEST_AUTH"
  })
  CallApi.get("/account", {
    params: {
      session_id
    }
  }).then(user => {
    dispatch(updateAuth({ user, session_id }));
    dispatch(fetchFavoriteMovies({ user, session_id }));
    dispatch(fetchWatchList({ user, session_id }));
  })
    .catch(err => dispatch({
      type: "FETCH_ERROR_AUTH",
      payload: err
    }));
};

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    const favoriteMovies = data.results.map(movie => movie.id);
    dispatch(updateFavoriteMovies(favoriteMovies));
  });
}

export const updateFavoriteMovies = movies => {
  return {
    type: "UPDATE_FAVORITE_MOVIES",
    payload: movies
  };
};

export const updateAuth = ({ user, session_id }) => ({
  type: "FETCH_SUCCESS_AUTH",
  payload: {
    user,
    session_id
  }
});

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

export const fetchWatchList = ({ user, session_id }) => dispatch => {
  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      language: "ru-Ru",
      session_id: session_id
    }
  })
    .then(data => {
      const watchList = data.results.map(movie => movie.id);
      dispatch(updateWatchList(watchList));
    });
}

export const updateWatchList = watchList => {
  return {
    type: "UPDATE_WATCHLIST",
    payload: watchList
  };
};