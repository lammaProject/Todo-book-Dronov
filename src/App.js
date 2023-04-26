import { Component } from "react";
import Todolist from "./Todolist";
import TodoAdd from "./Todoadd";
import TodoDetail from "./TodoDetail";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

const date1 = new Date(2021, 7, 19, 14, 5);
const date2 = new Date(2021, 7, 19, 15, 23);

const initialData = [
  {
    title: "Изучить React",
    desc: "Да поскорее!",
    image: "",
    done: false,
    createdAt: date1.toLocaleString(),
    key: 0,
  },
  {
    title: "Написать первое React-приложение",
    desc: "Список запланированных дел",
    image: "",
    done: false,
    key: date2.getTime(),
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: initialData };
    this.setDone = this.setDone.bind(this);
    this.delete = this.delete.bind(this);
    this.addDeal = this.addDeal.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
  }

  showMenu(evt) {
    evt.preventDefault();
    this.setState((state) => ({ showMenu: !state.showMenu }));
  }

  addDeal(deed) {
    this.state.data.push(deed);
    this.setState((state) => ({}));
  }

  delete(key) {
    const newData = this.state.data.filter((current) => current.key !== key);
    this.setState((prev) => ({ data: newData }));
  }

  setDone(key) {
    const deed = this.state.data.find((item) => item.key === key);
    this.setState({});
    deed.done ? (deed.done = false) : (deed.done = true);
  }

  getDeed(key) {
    key = +key;
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
              Todos
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
            <NavLink
              to="/add"
              className={({ isActive }) =>
                "navbar-item" + (isActive ? "is-active" : "")
              }
            >
              Создать дело
            </NavLink>
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <Routes>
            <Route
              path="/"
              element={
                <Todolist
                  list={this.state.data}
                  setDone={this.setDone}
                  delete={this.delete}
                ></Todolist>
              }
            />
            <Route path="/add" element={<TodoAdd add={this.addDeal} />} />
            <Route
              path="/:key"
              element={<TodoDetail getDeed={this.getDeed} />}
            />
          </Routes>
        </main>
      </HashRouter>
    );
  }
}
