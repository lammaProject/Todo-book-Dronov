import { useState } from "react";
import { login } from "./api";
import { NavLink, Navigate } from "react-router-dom";

export default function Login(props) {
  const [valEmail, setValEmail] = useState("");
  const [valPass, setValPass] = useState("");
  const [showError, setShowError] = useState({ email: "", password: "" });
  const [log, setLog] = useState(false);

  function validate() {
    if (!valEmail) {
      setShowError({ email: "Адрес электронной почты не указан" });
      console.log(showError);
      return false;
    }

    if (!valPass) {
      setShowError({ password: "Пароль не указан" });
      return false;
    }

    return true;
  }

  async function handleForm() {
    if (validate()) {
      setShowError({ email: "", password: "" });
      const result = await login(valEmail, valPass);

      if (result === "auth/invalid-email") {
        setShowError({ email: "Такой пользователь не зарегистрирован" });
      }

      if (result === "auth/wrong-password") {
        setShowError({ password: "Неправильный пароль" });
      }

      if (typeof result === "object") {
        setLog(true);
      }
    }
  }

  if (props.currentUser) return <Navigate to="/" replace />;
  else
    return (
      <section>
        <h1>Вход</h1>
        <form>
          <div className="field">
            <label className="label">Адрес электронной почты</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={valEmail}
                onChange={(e) => setValEmail(e.target.value)}
              />
              {showError.email && (
                <p className="help is-danger">{showError.email}</p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Пароль</label>
            <div className="control">
              <input
                type="password"
                className="input"
                value={valPass}
                onChange={(e) => setValPass(e.target.value)}
              />
            </div>
            {showError.password && (
              <p className="help is-danger">{showError.password}</p>
            )}
          </div>
          <div className="field is-grouped is-grouped-right">
            <div className="control">
              {log && <Navigate to="/" replace />}
              <input
                type="reset"
                className="button is-primary"
                value="Войти"
                onClick={handleForm}
              />
            </div>
          </div>
        </form>

        <div className="field is-grouped is-grouped-right mt-2">
          <div className="control">
            <NavLink to="/register">
              <input
                type="reset"
                className="button is-primary"
                value="Зарегестрироваться"
              />
            </NavLink>
          </div>
        </div>
      </section>
    );
}
