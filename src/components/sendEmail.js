import React, { Fragment } from "react";
import emailjs from "emailjs-com";

const sendEmail = () => {
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm("service_4da7hz1","template_ixccgdi",e.target,"user_C9QFMXD2JTZf0mLcSM271")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <Fragment>
      <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>Email</label>
        <input type="email" name="from_email" />
        <input type="submit" value="Send" />
      </form>
    </Fragment>
  );
};

export default sendEmail;
