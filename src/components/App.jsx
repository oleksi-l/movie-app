import React from "react";
import Filters from "./Filters/Filters";

import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        year: "2019",
        genres: []
      },
      page: 1,
      total_pages: 500
    }
    this.state = this.initialState;
  }

  onChangeFilters = event => {
    const newFilters = { ...this.state.filters, [event.target.name]: event.target.value };
    this.setState({
      filters: newFilters
    });
  };

  onChangePage = page => {
    if(page > this.state.total_pages)
      return false;
    this.setState({
      page
    });
  };

  setTotalPages = count => {
    this.setState({
      total_pages: count
    });
  };

  throwFilters = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      ...this.initialState
    })
  }

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  page={page}
                  total_pages={total_pages}
                  onChangePage={this.onChangePage}
                  throwFilters={this.throwFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              setTotalPages={this.setTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
