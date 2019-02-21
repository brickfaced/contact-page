import React, { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState(false);

  function handleFormChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "message":
        setMessage(e.target.value);
        break;
      default:
        console.log("what the..?");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      axios.post(
        "https://us-central1-contact-page-email.cloudfunctions.net/sendMeTheEmail",
        {
          name: name,
          email: email,
          message: message
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitState(true);
    }
  }

  return (
    <>
      {submitState ? (
        <p>Message Recieved</p>
      ) : (
        <form onSubmit={event => handleSubmit(event)}>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleFormChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleFormChange}
          />
          <input
            name="message"
            placeholder="Message"
            value={message}
            onChange={handleFormChange}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </>
  );
}
