import React from "react";

const Navigation = props => {
  const { onChangePage, page, total_pages, throwFilters } = props;
  return (
    <React.Fragment>
      <div className="btn-group d-flex justify-content-center" role="group">
        <button
          type="button"
          className="btn btn-light"
          onClick={onChangePage.bind(null, page - 1)}
          disabled={page === 1}
        >
          Назад
        </button>
        <button type="button" className="btn" disabled>
          {`${total_pages > 0 ? page : 0} из ${total_pages}`}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={onChangePage.bind(null, page + 1)}
          disabled={page === total_pages}
        >
          Вперёд
        </button>
      </div>
        <button type="button" className="btn btn-danger mt-4" onClick={throwFilters}>
          Сбросить фильтры
        </button>
    </React.Fragment>
  );
};

export default Navigation;
