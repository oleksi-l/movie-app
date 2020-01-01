import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

class MovieBookmarkIcon extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    }
  }

  setLoading = state => {
    this.setState({isLoading: state})
  }

  toggleAddWatchlist = movieId => {
    const { session_id, user, getWatchList, toggleModal} = this.props;

    if (!session_id) {
      toggleModal();
      return;
    }

    this.setLoading(true);

    CallApi.post("/account/${user.id}/watchlist", {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: movieId,
        watchlist: !this.inWatchList()
      }
    })
      .then(() => {
        getWatchList({user, session_id});
        this.setLoading(false);
      });
  };

inWatchList = () => {
  const {watchList,movieId} = this.props;
  return watchList.includes(movieId);
}

  render() {    
    return (
      <span
        disabled={this.state.isLoading}
        onClick={() => this.toggleAddWatchlist(this.props.movieId)}
      >
        {!this.inWatchList() ? <BookmarkBorder /> : <Bookmark />}
      </span>
    )
  }
}

export default AppContextHOC(MovieBookmarkIcon);