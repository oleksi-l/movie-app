import React from "react";
import MovieActionTab from "./MovieActionTab";
import PosterImage from "../UI/PosterImage";
import { Link } from "react-router-dom";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <PosterImage 
          className="card-img-top card-img--height" 
          src={item.backdrop_path || item.poster_path} 
        />
        <div className="col">
          <MovieActionTab movieId={item.id} />
        </div>
        <div className="card-body">
          <Link className="card-title" to={`/movie/${item.id}`}>{item.title}</Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}