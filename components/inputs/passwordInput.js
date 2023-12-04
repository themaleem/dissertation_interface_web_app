import { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import {
  required,
  composeValidators,
  validateStrongPassword,
} from "../../lib/objects";
import TextInput from "./textInput";
import ImageComponent from "../image";
import EyesOnImage from "../../public/images/eye-on.svg";
import EyesOffImage from "../../public/images/eye-off.svg";
import Portal from "../portal";

const PasswordInput = ({
  id = "password",
  name = "password",
  labelText = "Password",
  validatePasswordField,
}) => {
  const [inputType, setInputType] = useState("password");

  const passwordIconNodeId = `passwordicon${id}`;

  const onShowText = () =>
    setInputType(inputType === "text" ? "password" : "text");

  return (
    <>
      <Field
        id={id || "password"}
        labelText={labelText}
        component={TextInput}
        name={name || "password"}
        className="input js-handle"
        type={inputType || "password"}
        passwordIconNodeId={passwordIconNodeId}
        validate={
          validatePasswordField
            ? composeValidators(required, validateStrongPassword)
            : required
        }
      />

      <Portal id={passwordIconNodeId}>
        <span onClick={onShowText}>
          {inputType === "text" ? (
            <ImageComponent
              src={EyesOffImage}
              className="eye-on"
              alt="hide password"
            />
          ) : (
            <ImageComponent
              src={EyesOnImage}
              className="eye-on"
              alt="show password"
            />
          )}
        </span>
      </Portal>
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
