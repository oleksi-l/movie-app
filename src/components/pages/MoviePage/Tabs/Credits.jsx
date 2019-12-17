import React from "react";
import CallApi from "../../../../api/api";
import { withRouter } from 'react-router-dom';

class Credits extends React.Component {
  constructor() {
    super();
    this.state = {
      actors: [],
      isLoading: false
    }
  }

  getCredits = (id) => {
    this.setState({ isLoading: true })
    CallApi.get(`/movie/${id}/credits`, {})
      .then(data => this.setState({ actors: data.cast, isLoading: false }));
  }

  componentDidMount() {
    this.getCredits(this.props.match.params.id);
  }

  render() {
    return (
      <div className="d-flex flex-wrap">
        {this.state.isLoading ? (<div className="loading">
          <p>Loading...</p>
        </div>) : null}        {this.state.actors.map(actor => {
          return <div className="card actor-card mr-3 mt-3">
            <img className="actor-photo" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} />
            <p className="card-title">{actor.name}</p>
            <p className="actor-character">{actor.character}</p>
          </div>
        })}
      </div>
    )
  }
}

export default withRouter(Credits);