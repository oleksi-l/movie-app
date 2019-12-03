import React from "react";
import SortBy from "./SortBy";
import SortGenres from "./SortGenres";
import Pagination from "./Pagination";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by,year,genres },
      onChangeFilters,
      updatePage,
      page,
      total_pages,
      resetFilters
    } = this.props; 
    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
          type="sort_by"
          title={"Сортировать по:"}
        />
        <SortBy
          sort_by={year}
          onChangeFilters={onChangeFilters}
          type="year"
          title={"Сортировать по году:"}
        />
        <SortGenres genres={genres} onChangeFilters={onChangeFilters} />
        <Pagination
          resetFilters={resetFilters}
          updatePage={updatePage}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
