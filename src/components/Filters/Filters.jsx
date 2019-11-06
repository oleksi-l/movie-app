import React from "react";
import SortBy from "./SortBy";
import SortGenres from "./SortGenres";
import Navigation from "../UI/Navigation/Navigation";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      filters: { year },
      filters: { genres },
      onChangeFilters,
      onChangePage,
      page,
      total_pages,
      throwFilters
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
        <Navigation
          throwFilters={throwFilters}
          onChangePage={onChangePage}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
