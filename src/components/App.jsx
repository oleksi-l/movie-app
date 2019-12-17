import React from "react";
import Header from "./Header/Header";
import { Modal, ModalBody } from "reactstrap";
import LoginModal from "./Header/Login/LoginModal";
import LoginForm from "./Header/Login/LoginForm";
import MoviePage from "./pages/MoviePage/MoviePage";
import MoviesPages from "./pages/MoviesPage/MoviesPages";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";

export const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: null,
      showModal: false,
      favoriteMovies: [],
      watchList: [],
      isLoading: false
    };
    this.state = this.initialState;
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading
    }))
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  updateUser = user => {
    cookies.set("user_id", user.id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({ user });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({ session_id });
  };

  updatePage = page => {
    this.setState({
      page
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    cookies.remove("user_id");
    this.setState({
      session_id: null,
      user: null,
      favoriteMovies: [],
      watchList: []
    });
  };

  getFavoriteMovies = (userId, sessionId) => {
    CallApi.get(`/account/${userId}/favorite/movies`, {
      params: {
        language: "ru-Ru",
        session_id: sessionId
      }
    })
      .then(data => {
        const favorite = data.results.map(movie => movie.id);
        this.setState({ favoriteMovies: favorite });
      });
  };

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

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get(`/account`, {
        params: {
          session_id: session_id
        }
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.session_id !== this.state.session_id) {
      if(this.state.user !== null){
        this.getFavoriteMovies(this.state.user.id, this.state.session_id);
        this.getWatchList(this.state.user.id, this.state.session_id);
      }
    }
  }

  render() {
    const { user, session_id, showModal, favoriteMovies, watchList,isLoading } = this.state;
    
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            session_id: session_id,
            favoriteMovies: favoriteMovies,
            watchList: watchList,
            toggleModal: this.toggleModal,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchList: this.getWatchList,
            showModal:showModal
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