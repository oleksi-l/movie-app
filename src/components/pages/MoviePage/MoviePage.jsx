import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import MovieActionTab from "../../Movies/MovieActionTab";
import Tabs from "./Tabs/Tabs";
import CallApi from "../../../api/api";

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieDetails: {},
      isLoading: false
    };
  }

  getMovieDetails = () => {
    this.setState({isLoading:true})
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" }
    }).then(data => {
      this.setState({
        movieDetails: data,
      });
      this.setState({isLoading:false})
    });
  };

  componentDidMount() {
    this.getMovieDetails();
  }

  render() {
    const { backdrop_path, poster_path, title, overview, id } = this.state.movieDetails;
    return (<div className="container">
      <div className="row mt-3">
        <div className="col-md-4">
          <img className="poster__image"
            src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`} alt="" />
        </div>
        <div className="col-md-8">
          <h3>{title}</h3>
          <MovieActionTab
            movieId={id}
          />
          <h5 className="mt-2">Обзор</h5>
          <p>{overview}</p>
        </div>
      </div>
      <div className="row">
      <div className="col-md-12 d-flex pt-3">
          {/* <Tabs id={id} /> */}
        </div>
      </div>
    </div>);
  }
}

export default AppContextHOC(MoviePage);