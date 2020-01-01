import React from "react";
import Header from "./Header/Header";
import LoginModal from "./Header/Login/LoginModal";
import MoviePage from "./pages/MoviePage/MoviePage";
import MoviesPages from "./pages/MoviesPage/MoviesPages";
import CallApi from "../api/api";
import {
  updateAuth,
  onLogOut,
  updateFavoriteMovies, toggleModal, updateWatchList,
  fetchAuth, fetchFavoriteMovies, fetchWatchList
} from "../redux/auth/auth.actions";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

export const AppContext = React.createContext();

class App extends React.Component {
  componentDidMount() {
    const { session_id, fetchAuth } = this.props;
    if (session_id) {
      fetchAuth(session_id);
    }
  }

  render() {
    const { user, session_id, isAuth, favoriteMovies, watchList,
      updateAuth, onLogOut, showModal, toggleModal,
      fetchFavoriteMovies, fetchWatchList } = this.props;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateAuth: updateAuth,
            onLogOut: onLogOut,
            session_id: session_id,
            isAuth: isAuth,
            showModal: showModal,
            favoriteMovies: favoriteMovies,
            watchList: watchList,
            getFavoriteMovies: fetchFavoriteMovies,
            getWatchList: fetchWatchList,
            toggleModal: toggleModal,
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPages} />
            <Route path="/movie/:id" component={MoviePage} />
            {showModal && <LoginModal />}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
    showModal: state.auth.showModal,
    favoriteMovies: state.auth.favoriteMovies,
    watchList: state.auth.watchList
  };
};

const mapDispatchToProps = {
  updateAuth,
  onLogOut,
  toggleModal,
  updateFavoriteMovies,
  updateWatchList,
  fetchAuth,
  fetchFavoriteMovies,
  fetchWatchList
};

export default connect(mapStateToProps, mapDispatchToProps)(App);