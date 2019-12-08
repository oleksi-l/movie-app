import React from "react";
import Header from "./Header/Header";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./Header/Login/LoginForm";
import MoviePage from "./pages/MoviePage/MoviePage";
import MoviesPages from "./pages/MoviesPage/MoviesPages";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Link } from "react-router-dom";

export const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: null,
      showModal: false
    };
    this.state = this.initialState;
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
    this.setState({ user, showModal: false });
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
      user: null
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
      });
    }
  }

  render() {
    const { user, session_id } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            session_id: session_id,
            toggleModal: this.toggleModal
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPages} />
            <Route path="/movie/:id" component={MoviePage} />
            <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
              <ModalBody>
                <LoginForm />
              </ModalBody>
            </Modal>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
