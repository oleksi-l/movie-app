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

  toggleAddWatchlist = movieId => {
    const { session_id, user, watchList, getWatchList, toggleModal
    } = this.props;

    if (session_id === null) {
      toggleModal();
      return false;
    }

    const inWatchList = watchList.includes(movieId);
    this.setState({ isLoading: true })

    CallApi.post("/account/${user.id}/watchlist", {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: movieId,
        watchlist: !inWatchList
      }
    })
      .then(data => {
        getWatchList(user.id, session_id);
        this.setState({ isLoading: false });
      });
  };
  render() {
    const { movieId, watchList } = this.props;
    const inWatchList = watchList.includes(movieId);
    
    return (
      <span
        disabled={this.state.isLoading ? "disabled" : ""}
        onClick={() => this.toggleAddWatchlist(movieId)}
      >
        {!inWatchList ? <BookmarkBorder /> : <Bookmark />}
      </span>
    )
  }
}

export default AppContextHOC(MovieBookmarkIcon);