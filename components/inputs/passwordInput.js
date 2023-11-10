import { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import {
  composeValidators,
  required,
  validateStrongPassword,
} from "../../lib/objects";
import TextInput from "./textInput";
import ImageComponent from "../image";
import EyesOnImage from "../../public/images/eye-on.svg";
import EyesOffImage from "../../public/images/eye-off.svg";

const PasswordInput = ({
  id = "password",
  name = "password",
  labelText = "Password",
  validatePasswordField,
}) => {
  const [inputType, setInputType] = useState("password");

  const onShowText = () =>
    setInputType(inputType === "text" ? "password" : "text");

  return (
    <>
      <Field
        id={id || "password"}
        component={TextInput}
        name={name || "password"}
        className="input js-handle"
        type={inputType || "password"}
        validate={
          validatePasswordField
            ? composeValidators(required, validateStrongPassword)
            : required
        }
      />
      <label htmlFor={id}> {labelText} </label>

      <span onClick={onShowText}>
        {inputType === "text" ? (
          <ImageComponent
            src={EyesOffImage}
            className="eye-on"
            alt="hide password"
          />
        ) : (
          <ImageComponent
            className="eye-on"
            alt="show password"
            src={EyesOnImage}
          />
        )}
      </span>
    </>
  );
};

PasswordInput.defaultProps = {
  id: undefined,
  name: undefined,
  validatePasswordField: undefined,
};

PasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  validatePasswordField: PropTypes.bool,
};

export default PasswordInput;
