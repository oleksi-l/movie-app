import React from "react";
import {Bookmark, BookmarkBorder,Favorite,FavoriteBorder } from "@material-ui/icons";

const MovieActionTab = (props) => {
    const {isFavorite,toggleLike,id,inWatchList,toggleAddWatchlist} = props;
    return (
      <div className="pt-2">
        <span
          title={isFavorite ? "liked" : "unliked"}
          onClick={() => toggleLike(id)}
        >
          {!isFavorite ? <FavoriteBorder /> : <Favorite />}
        </span>
        <span
          title={inWatchList ? "added" : "not added"}
          onClick={() => toggleAddWatchlist(id)}
        >
          {!inWatchList ? <BookmarkBorder /> : <Bookmark />}
        </span>
      </div>
    )
}

export default MovieActionTab;
