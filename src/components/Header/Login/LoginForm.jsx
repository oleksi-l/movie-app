import React from "react";
import classNames from "classnames";
import CallApi from "../../../api/api";
import { AppContext } from "../../App";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false
  };

  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(state => ({
      [name]: value,
      errors: {
        ...state.errors,
        [name]: null,
        base: null
      }
    }));
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") errors.username = "Not empty";

    if (this.state.password === "") errors.password = "Required";

    if (this.state.repeatPassword !== this.state.password)
      errors.repeatPassword = "Password must be an equal";

    return errors;
  };

  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    CallApi.get("/authentication/token/new", {})
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.props.updateUser(user);
        this.props.toggleModal();
        this.setState({
          submitting: false
        });
        const { getWatchList, getFavoriteMovies, session_id } = this.props;
        getWatchList(user.id, session_id);
        getFavoriteMovies(this.props.user.id, session_id);
      })
      .catch(error => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  handleBlur = event => {
    const name = event.target.name;
    const errors = this.validateFields();
    if (errors[name]) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          [name]: errors[name]
        }
      }));
    }
  };

  getClassName = fieldName =>
    classNames("form-control", {
      "is-invalid": this.state.errors[fieldName]
    });

  render() {
    const { username, password, repeatPassword, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form action="" className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              className={this.getClassName("username")}
              id="username"
              name="username"
              placeholder="Логин"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="text"
              className={this.getClassName("password")}
              id="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторить пароль</label>
            <input
              type="text"
              className={this.getClassName("repeatPassword")}
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Пароль"
              value={repeatPassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatPassword && (
              <div className="invalid-feedback">{errors.repeatPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            disabled={submitting}
            onClick={this.onLogin}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default props => {
  return (
    <AppContext.Consumer>
      {context => (
        <LoginForm
          updateUser={context.updateUser}
          updateSessionId={context.updateSessionId}
          session_id={context.session_id}
          user={context.user}
          toggleModal={context.toggleModal}
          getFavoriteMovies={context.getFavoriteMovies}
          getWatchList={context.getWatchList}
        />
      )}
    </AppContext.Consumer>
  );
};
