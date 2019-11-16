import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";
export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false
  };

  onChange = event => {
    const name = [event.target.name];
    const value = event.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null
      }
    }));
  };

  validateFields = event => {
    const errors = {};
    switch (event.target.name) {
      case "username":
        if (this.state.username === "") errors.username = "Not empty";
        break;
      case "password":
        if (this.state.password === "") errors.password = "Required";
        break;
      case "repeatPassword":
        if (this.state.repeatPassword !== this.state.password)
          errors.repeatPassword = "Password must be an equal";
        break;
    }
    console.log(errors);
    return errors;
  };

  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields(event);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            request_token: data.request_token
          })
        });
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
        );
      })
      .then(user => {
        this.props.updateUser(user);
        this.setState({
          submitting: false
        });
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
    const errors = this.validateFields(event);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
