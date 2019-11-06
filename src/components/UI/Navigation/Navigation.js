import React from "react";

const Navigation = props => {
  const { onChangePage, page, total_pages } = props;
  return (
    <div
      className="btn-group d-flex justify-content-center"
      role="group"
      aria-label="Basic example"
    >
      <button
        type="button"
        className="btn btn-light"
        onClick={onChangePage.bind(null, page - 1)}
        disabled={page === 1}
      >
        Назад
      </button>
      <button type="button" className="btn" disabled>
        {`${page} из ${total_pages}`}
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={onChangePage.bind(null, page + 1)}
      >
        Вперёд
      </button>
    </div>
  );
};

export default Navigation;
