import React from "react";
import "./Form.css";

function Form({
  name,
  onSubmit,
  isFormValid,
  isFormDisabled,
  isUserDataChanged,
  buttonText,
  isModifying,
  ...props
}) {

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
          // eslint-disable-next-line no-sequences
          name === "login", "register", "profile" && !isModifying 
            ? "form__button-submit_hidden"
            : 
            (!isFormValid || isFormDisabled || isUserDataChanged) && "form__button-submit_disabled" }  button`} 
      >
        {buttonText}
      </button>
      
    </form>
  );
}

export default Form;
