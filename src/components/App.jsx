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
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState =>({
      filters:{
        ...prevState.filters,
        [name]:value 
      }
    }))
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  updateTotalPages = count => {
    this.setState({
      total_pages: count
    });
  };

  resetFilters = event => {
    this.setState(this.initialState)
  }

  render() {
    const { filters, page, total_pages } = this.state;
    return (
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
                  onChangePage={this.onChangePage}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              updateTotalPages={this.updateTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
