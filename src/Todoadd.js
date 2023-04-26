import { Component } from "react";
import { Navigate } from "react-router-dom";

export default class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDes = this.handleDes.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.clearForm();
  }

  clearForm() {
    this.formData = {
      title: "",
      desc: "",
      image: "",
    };
  }

  handleTitle(evt) {
    this.formData.title = evt.target.value;
  }
  handleDes(evt) {
    this.formData.desc = evt.target.value;
  }

  handleImage(evt) {
    const cFiles = evt.target.files;
    if (cFiles.length > 0) {
      const fileReader = new FileReader();
      const that = this;
      fileReader.onload = () => {
        that.formData.image = fileReader.result;
      };
      fileReader.readAsDataURL(cFiles[0]);
    } else {
      this.formData.image = "";
    }
  }

  handleForm(evt) {
    evt.preventDefault();
    const newDeed = { ...this.formData };
    const date = new Date();
    newDeed.done = false;
    newDeed.createdAt = date.toLocaleString();
    newDeed.key = date.getTime();
    this.props.add(newDeed);
    this.setState((state) => ({ redirect: true }));
  }

  render() {
    if (this.state.redirect) return <Navigate to="/" />;
    return (
      <section>
        <h1>Создание нового дела</h1>
        <form onSubmit={this.handleForm}>
          <div className="field">
            <label className="label">Заголовок</label>
            <div className="control">
              <input className="input" onChange={this.handleTitle} />
            </div>
          </div>
          <div className="field">
            <label className="label">Примечание</label>
            <div className="control">
              <textarea
                className="textarea"
                onChange={this.handleDes}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="field">
              <label className="field-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  onChange={this.handleImage}
                  style={{ height: "auto" }}
                />
                <span className="file-cta">
                  <span className="file-label">Графическая иллюстрация...</span>
                </span>
              </label>
            </div>
          </div>
          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <input
                type="reset"
                className="button is-link is-light"
                value="Сброс"
              />
            </div>
            <div className="control">
              <input
                type="submit"
                className="button is-primary"
                value="Создать дело"
              />
            </div>
          </div>
        </form>
      </section>
    );
  }
}