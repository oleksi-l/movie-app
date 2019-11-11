import React from "react";

class Pagination extends React.Component {
  onChangePage = page => {
    this.props.onChangePage(page);
  };
  render() {
    const { page, total_pages, resetFilters } = this.props;
    return (
      <React.Fragment>
        <div className="btn-group d-flex justify-content-center" role="group">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => this.onChangePage(page - 1)}
            disabled={page === 1}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => this.onChangePage(page + 1)}
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
        <button type="button" className="btn btn-danger mt-4" onClick={resetFilters}>
          Сбросить фильтры
        </button>
      </React.Fragment>
    );
  }
}

export default Pagination;
