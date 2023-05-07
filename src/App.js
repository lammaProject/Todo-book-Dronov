import { Component } from "react";
import Todolist from "./Todolist";
import TodoAdd from "./Todoadd";
import TodoDetail from "./TodoDetail";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Register from "./Register";
import { app } from "./firebase";
import Logout from "./Logout";
import Login from "./Login";
import { getList, setDone, del } from "./api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], currentUser: null };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.addDeal = this.addDeal.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);
  }

  async authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }));
    if (user) {
      const newData = await getList(user);
      this.setState((state) => ({ data: newData }));
    } else {
      this.setState((state) => ({ data: [] }));
    }
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(app), this.authStateChanged);
  }

  showMenu(evt) {
    evt.preventDefault();
    this.setState((state) => ({ showMenu: !state.showMenu }));
  }

  addDeal(deed) {
    this.state.data.push(deed);
    this.setState((state) => ({}));
  }

  async delete(key) {
    await del(this.state.currentUser, key);
    const newData = this.state.data.filter((current) => current.key !== key);
    this.setState((prev) => ({ data: newData }));
  }

  async setDone(key, done) {
    await setDone(this.state.currentUser, key, done);
    const deed = this.state.data.find((item) => item.key === key);
    this.setState({});
    deed.done ? (deed.done = false) : (deed.done = true);
  }

  getDeed(key) {
    return this.state.data.find((current) => current.key === key);
  }

  render() {
    return (
      <HashRouter>
        <nav className="navbar has-background-grey">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "navbar-item is-uppercase" + (isActive ? "is-active" : "")
              }
            >
              {this.state.currentUser ? this.state.currentUser.email : "Todos"}
            </NavLink>
            <a
              href="/"
              className={
                this.state.showMenu
                  ? "navbar-burger is-active"
                  : "navbar-burger"
              }
              onClick={this.showMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div
            className={
              this.state.showMenu ? "navbar-menu is-active" : "navbar-menu"
            }
            onClick={this.showMenu}
          >
            <div className="navbar-start">
              {this.state.currentUser && (
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? "is-active" : "")
                  }
                >
                  Создать дело
                </NavLink>
              )}
              {!this.state.currentUser && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? "is-active" : "")
                  }
                >
                  Войти
                </NavLink>
              )}
            </div>
            {this.state.currentUser && (
              <div className="navbar-end">
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? "is-active" : "")
                  }
                >
                  Выйти
                </NavLink>
              </div>
            )}
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <Routes>
            <Route
              path="/"
              element={
                <Todolist
                  currentUser={this.state.currentUser}
                  list={this.state.data}
                  setDone={this.setDone}
                  delete={this.delete}
                />
              }
            />
            <Route
              path="/add"
              element={
                <TodoAdd
                  add={this.addDeal}
                  currentUser={this.state.currentUser}
                />
              }
            />
            <Route
              path="/:key"
              element={
                <TodoDetail
                  getDeed={this.getDeed}
                  currentUser={this.state.currentUser}
                />
              }
            />
            <Route
              path="/register"
              element={<Register currentUser={this.state.currentUser} />}
            />
            <Route
              path="/login"
              element={<Login currentUser={this.state.currentUser} />}
            />
            <Route
              path="/logout"
              element={<Logout currentUser={this.state.currentUser} />}
            />
          </Routes>
        </main>
      </HashRouter>
    );
  }
}
