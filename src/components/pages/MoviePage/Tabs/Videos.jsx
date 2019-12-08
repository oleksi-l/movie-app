import React from "react";

const Videos = ({ videos }) => {
	return (
		<div>
			{videos.length > 0 && videos.map(video => {
				return <a target="_blank" href={`https://www.youtube.com/watch?v=${video.key}`}>
					<img className="mr-3 pt-3"
						src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
				</a>
			})}
		</div>
	)
}

export default Videos;