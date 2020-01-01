import React from "react";

const PosterImage = props => {
	return <img
		className={props.className}
		src={`https://image.tmdb.org/t/p/w500${props.src}`}
	/>
};

export default PosterImage;