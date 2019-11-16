import React from "react";

export default class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          width="40"
          className="rounded-circle"
<<<<<<< HEAD
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
=======
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
>>>>>>> add-login-form
          alt=""
        />
      </div>
    );
  }
}
