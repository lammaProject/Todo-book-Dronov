import { Component } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { register } from "./api";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearFormData();
  }

  clearFormData() {
    this.formData = {
      email: "",
      password: "",
    };
  }

  handleEmailChange(evt) {
    this.formData.email = evt.target.value;
  }

  handlePasswordChange(evt) {
    this.formData.password = evt.target.value;
  }

  async handleFormSubmit(evt) {
    evt.preventDefault();
    console.log('asdnasdn')
    const result = await register(this.formData.email, this.formData.password);
    console.log(result)
    if (typeof result !== "object") {
      console.log(result, 'RES ERR');
    }
  }

  render() {
    if (this.props.currentUser) return <Navigate to="/" replace />;
    else
      return (
        <section>
          <h1>Регистрация</h1>
          <form>
            <div className="field">
              <label className="label">Адрес электронной почты</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Пароль</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <input
                  type="reset"
                  className="button is-primary"
                  value="Зарегистрироваться"
                  onClick={this.handleFormSubmit}
                />
              </div>
            </div>
          </form>

          <div className="field is-grouped is-grouped-right mt-2">
        <div className="control">
          <NavLink to="/login">
            <input
              type="reset"
              className="button is-primary"
              value="Войти"
            />
          </NavLink>
        </div>
      </div>
        </section>
      );
  }
}
