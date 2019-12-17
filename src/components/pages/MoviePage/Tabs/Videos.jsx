import React from "react";
import CallApi from "../../../../api/api";
import { withRouter } from 'react-router-dom';

class Videos extends React.Component {
  constructor(){
    super();
    this.state={
      videos:[],
      isLoading:false
    }
  }

  getVideo = (id) => {
    this.setState({isLoading:true});
    CallApi.get(`/movie/${id}/videos`, { language: "ru-RU" })
      .then(data => this.setState({ videos: data.results,isLoading:false }));
  }

  componentDidMount(){
    this.getVideo(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (<div className="loading">
          <p>Loading...</p>
        </div>):null}
        {this.state.videos.length > 0 && this.state.videos.map(video => {
          return <a target="_blank" href={`https://www.youtube.com/watch?v=${video.key}`}>
            <img className="mr-3 pt-3"
              src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
          </a>
        })}
      </div>
    )
  }
}

export default withRouter(Videos);