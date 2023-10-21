import React from "react";
import "./Form.css";

function Form({
  name,
  onSubmit,
  isFormValid,
  isCurrentUser,
  buttonText,
  isModifying,
  ...props
}) {

  function handleButtonDisable() {
    if (name === "profile") {
      return isFormValid && !isCurrentUser ? false : true;
    } else {
      return isFormValid ? false : true;
    }
  }

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <button
        type="submit"
        form={`${name}`}
        className={`form__button-submit form__button-submit_type_${name} ${
          name === "profile" && !isModifying
            ? "form__button-submit_hidden"
            : ''
        } button`}
        disabled={handleButtonDisable()}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
