import React from "react";
<<<<<<< HEAD
import Login from "./Login/Login";
import User from "./User";

class Header extends React.Component {
=======
import Login from "../Login/Login";
import User from "./User";

export default class Header extends React.Component {
>>>>>>> add-login-form
  render() {
    const { user, updateUser, updateSessionId } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
<<<<<<< HEAD
              <a href="/" className="nav-link">
=======
              <a href="#" className="nav-link">
>>>>>>> add-login-form
                Home
              </a>
            </li>
          </ul>
          {user ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}
<<<<<<< HEAD

export default Header;
=======
>>>>>>> add-login-form
