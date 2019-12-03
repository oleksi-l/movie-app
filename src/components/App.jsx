import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./Header/Login/LoginForm";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

export const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        year: "2019",
        genres: []
      },
      page: 1,
      total_pages: 500,
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
    this.setState({ user,showModal:false });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({ session_id });
  };

  onChangeFilters = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  updatePage = page => {
    this.setState({
      page
    });
  };

  updateTotalPages = count => {
    this.setState({
      total_pages: count
    });
  };

  resetFilters = () => {
    this.setState(this.initialState);
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
      CallApi.get(`/account`,{
        params:{
          session_id: session_id
        }
      })
      .then(
        user => {
          this.updateUser(user);
        }
      );
    }
  }

  render() {
    const { filters, page, total_pages, user } = this.state;
    return (
      <AppContext.Provider value={{
        user: user,
        updateUser: this.updateUser,
        updateSessionId: this.updateSessionId,
        onLogOut: this.onLogOut,
        session_id: this.state.session_id,
        toggleModal: this.toggleModal
      }}>
        <div>
          <Header
            user={user}
          />
          <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      page={page}
                      total_pages={total_pages}
                      updatePage={this.updatePage}
                      resetFilters={this.resetFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  updatePage={this.updatePage}
                  updateTotalPages={this.updateTotalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
