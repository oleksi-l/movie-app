import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";

class Login extends React.Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.props.toggleModal}
        >
          Login
        </button>
      </div>
    );
  }
}

export default AppContextHOC(Login);
