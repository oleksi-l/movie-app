import React from "react";

export default class Pagination extends React.Component {
  updatePage = newPage => () => {
    this.props.updatePage(newPage);
  };

  render() {
    const { page, total_pages, resetFilters } = this.props;
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center" role="group">
          <button
            type="button"
            className="btn btn-light"
            onClick={this.updatePage(page - 1)}
            disabled={page === 1}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.updatePage(page + 1)}
            disabled={page === total_pages || total_pages === 0}
          >
            Вперёд
          </button>
          {total_pages > 0 && (
            <button type="button" className="btn" disabled>
              {`${page} из ${total_pages}`}
            </button>
          )}
        </div>
        <button
          type="button"
          className="btn btn-danger mt-4"
          onClick={resetFilters}
        >
          Сбросить фильтры
        </button>
      </React.Fragment>
    );
  }
}
