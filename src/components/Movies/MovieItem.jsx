import React from "react";
import MovieActionTab from "./MovieActionTab";

export default class MovieItem extends React.Component {
  render() {
    const { item, isFavorite, inWatchList } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
          alt=""
        />
        <MovieActionTab item={item} isFavorite={isFavorite} inWatchList={inWatchList} />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
