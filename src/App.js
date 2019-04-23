import React from "react";
import axios from "axios";
import "./App.scss";

const Card = props => (
  <div className="card">
    {/*<div className="waves">
    </div>*/}
    {props.children}
  </div>
);

const Form = props => (
  <form className="form" onSubmit={props.onSubmit}>
    {props.children}
  </form>
);

const TextInput = props => (
  <div className="text-input">
    <label
      className={props.focus || props.value !== "" ? "label-focus" : ""}
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <input
      className={props.focus || props.value !== "" ? "input-focus" : ""}
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onInput={props.onInput}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  </div>
);

const TextArea = props => (
  <div className="text-area">
    <label
      className={props.focus || props.value !== "" ? "label-focus" : ""}
      htmlFor={props.name}
    >
      {props.label}
    </label>
    <textarea
      className={props.focus || props.value !== "" ? "input-focus" : ""}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onInput={props.onInput}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  </div>
);

const Button = props => <button className="button">{props.children}</button>;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: {
        name: "name",
        label: "Name",
        value: "",
        focus: false
      },
      email: {
        name: "email",
        label: "Email",
        value: "",
        focus: false
      },
      message: {
        name: "message",
        label: "Message",
        value: "",
        focus: false
      },
      submit: false
    };
  }

  handleFocus(e) {
    const name = e.target.name;
    const state = Object.assign({}, this.state[name]);
    state.focus = true;
    this.setState({ [name]: state }, () => {
      console.log(state);
    });
  }

  handleBlur(e) {
    const name = e.target.name;
    const state = Object.assign({}, this.state[name]);
    state.focus = false;
    this.setState({ [name]: state }, () => {
      console.log(state);
    });
  }

  handleChange(e) {
    const name = e.target.name;
    const state = Object.assign({}, this.state[name]);
    state.value = e.target.value;
    this.setState({ [name]: state }, () => {
      console.log(state);
    });
  }

  handleSubmit(event) {
    const { name, email, message } = this.state;
    event.preventDefault();
    try {
      axios.post(
        "https://us-central1-contact-page-email.cloudfunctions.net/sendMeTheEmail",
        {
          name: name.value,
          email: email.value,
          message: message.value
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ submit: true });
    }
  }

  render() {
    const { name, email, message, submit } = this.state;
    return (
      <div className="container">
        {submit ? (
          <Card>
            <h1>Message Recieved</h1>
          </Card>
        ) : (
          <Card>
            <h1>Send us a Message!</h1>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <TextInput
                {...name}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
              />
              <TextInput
                {...email}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
              />
              <TextArea
                {...message}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
              />
              <Button type="submit">Send</Button>
            </Form>
          </Card>
        )}
      </div>
    );
  }
}

export default App;
