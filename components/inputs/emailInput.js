import PropTypes from "prop-types";
import { Field } from "react-final-form";

import {
  required,
  validateEmail,
  validateShuEmail,
  composeValidators,
} from "../../lib/objects";
import TextInput from "./textInput";

const EmailInput = ({
  id,
  name,
  change,
  disabled,
  validate,
  className,
  labelText,
  isShuEmail,
  placeholder,
  defaultValue,
  validateField,
}) => {
  const onChange = (e) => {
    const val = e.target.value.trim();
    change(name, val);
  };

  return (
    <Field
      id={id}
      name={name}
      type="text"
      onChange={onChange}
      disabled={disabled}
      component={TextInput}
      labelText={labelText}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue || undefined}
      validate={
        validateField
          ? validate ||
            (isShuEmail
              ? composeValidators(required, validateEmail, validateShuEmail)
              : composeValidators(required, validateEmail))
          : undefined
      }
    />
  );
};

EmailInput.defaultProps = {
  name: "email",
  id: undefined,
  disabled: false,
  defaultValue: "",
  isShuEmail: false,
  validate: undefined,
  placeholder: undefined,
  className: "input-text",
  validateField: undefined,
};

EmailInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
  isShuEmail: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  validateField: PropTypes.bool,
  defaultValue: PropTypes.string,
  change: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
};

export default EmailInput;
