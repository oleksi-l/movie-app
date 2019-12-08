import React from "react";

const Credits = props => {
	return (
		<div className="d-flex flex-wrap">
			{props.actors.map(actor => {
				return <div className="card actor-card mr-3 mt-3">
					<img className="actor-photo" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} />
					<p className="card-title">{actor.name}</p>
					<p className="actor-character">{actor.character}</p>
				</div>
			})}
		</div>
	)
}

export default Credits;