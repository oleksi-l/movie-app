import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
<<<<<<< HEAD
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
=======
import Cookies from "universal-cookie";
import { API_KEY_3, API_URL, fetchApi } from "../api/api";
>>>>>>> add-login-form

const cookies = new Cookies();

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
      total_pages: 500
    };
    this.state = this.initialState;
  }

  updateUser = user => {
    this.setState({ user });
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

<<<<<<< HEAD
  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

=======
>>>>>>> add-login-form
  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`).then(
        user => {
          this.updateUser(user);
        }
      );
    }
  }

  render() {
    const { filters, page, total_pages, user } = this.state;
    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
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
    );
  }
}
