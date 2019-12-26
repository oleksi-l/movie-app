import React from "react";
import Header from "./Header/Header";
import LoginModal from "./Header/Login/LoginModal";
import MoviePage from "./pages/MoviePage/MoviePage";
import MoviesPages from "./pages/MoviesPage/MoviesPages";
import CallApi from "../api/api";
import {
  updateAuth,
  onLogOut,
  updateFavoriteMovies, toggleModal
} from "../actions/actions";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

export const AppContext = React.createContext();

class App extends React.Component {
  getWatchList = (userId, sessionId) => {
    CallApi.get(`/account/${userId}/watchlist/movies`, {
      params: {
        language: "ru-Ru",
        session_id: sessionId
      }
    })
      .then(data => {
        const watchList = data.results.map(movie => movie.id);
        this.setState({ watchList: watchList });
      });
  };

  getFavoriteMovies = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id
      }
    }).then(data => {
      this.props.updateFavoriteMovies(data.results);
    });
  };

  componentDidMount() {
    const { session_id } = this.props;
    console.log(session_id);
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then(user => {
        this.props.updateAuth({ user, session_id });
        this.getFavoriteMovies({ user, session_id });
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.session_id !== this.state.session_id) {
  //     if (this.state.user !== null) {
  //       this.getFavoriteMovies(this.state.user.id, this.state.session_id);
  //       this.getWatchList(this.state.user.id, this.state.session_id);
  //     }
  //   }
  // }

  render() {
    const { user, session_id, isAuth, updateAuth, onLogOut, showModal, toggleModal } = this.props;
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
            // favoriteMovies: favoriteMovies,
            // watchList: watchList,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchList: this.getWatchList,
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
    showModal: state.auth.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: (user, session_id) =>
      dispatch(
        updateAuth({
          user,
          session_id
        })
      ),
    // onLogOut: () => dispatch(onLogOut()),
    toggleModal: () => dispatch(toggleModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);