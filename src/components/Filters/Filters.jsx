import React from "react";
import SortBy from './SortBy';

export default class Filters extends React.Component {
  render() {
    const {filters:{sort_by},onChangeFilters,onChangePage,page} = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}
        />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button 
              type="button" 
              className="btn btn-light" 
              onClick={onChangePage.bind(null,page-1)}
              disabled={page === 1}
            >Left</button>
            <button 
              type="button" 
              className="btn btn-light" 
              onClick={onChangePage.bind(null,page+1)}>Right</button>
          </div>
      </form>
    );
  }
}
