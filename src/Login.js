import { useState } from "react";
import { login } from "./api";
import { NavLink, Navigate } from "react-router-dom";

export default function Login(props) {
  const [valEmail, setValEmail] = useState("");
  const [valPass, setValPass] = useState("");
  const [log, setLog] = useState(false);

  async function handleForm() {
    const result = await login(valEmail, valPass);
    if (typeof result === 'object') {
      setLog(true);
    }
  }

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
