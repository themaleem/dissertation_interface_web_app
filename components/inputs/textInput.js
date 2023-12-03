import PropTypes from "prop-types";
import { useRef, useCallback } from "react";

const TextInput = ({
  id,
  meta,
  name,
  value,
  input,
  onBlur,
  onFocus,
  onClick,
  invalid,
  disabled,
  readOnly,
  onChange,
  tabIndex,
  fieldType,
  className,
  labelText,
  placeholder,
  hideErrorText,
  passwordIconNodeId,
}) => {
  const inputRef = useRef();

  const getErrorClass = useCallback(() => {
    if (invalid.trim.length || (meta.touched && meta.invalid)) {
      return " error-message";
    }
    return "";
  }, [meta, invalid]);

  const change = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      } else {
        input.onChange(event.currentTarget.value);
      }
    },
    [onChange, input],
  );

  const blur = useCallback(
    (event) => {
      if (onBlur) onBlur(event);
      if (input.onBlur) input.onBlur(event);
    },
    [onBlur, input],
  );

  const focus = useCallback(
    (event) => {
      if (onFocus) onFocus(event, input.name);
      if (input.onFocus) input.onFocus(event);
    },
    [onFocus, input],
  );

  return (
    <div
      className={`control${
        meta.error && meta.touched ? " has-error has-text-below" : ""
      }`}
    >
      <input
        id={id}
        onBlur={blur}
        ref={inputRef}
        onFocus={focus}
        onClick={onClick}
        onChange={change}
        autoComplete="off"
        tabIndex={tabIndex}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        name={input?.name || name}
        value={input?.value || value}
        type={fieldType || input.type || "text"}
        className={`${className}${getErrorClass()}`}
      />
      {meta.error && meta.error.trim() && meta.touched && !hideErrorText && (
        <p className="help is-danger">{meta.error}</p>
      )}
      <label htmlFor={id}> {labelText}</label>
      <span id={passwordIconNodeId} />

      {meta.submitError && !meta.dirtySinceLastSubmit && (
        <p className="error-messager">{meta.submitError}</p>
      )}
      {invalid.trim().length > 1 && <p className="error-messager">{invalid}</p>}
    </div>
  );
};

TextInput.defaultProps = {
  id: "",
  name: "",
  meta: {},
  input: {},
  value: "",
  invalid: "",
  className: "",
  placeholder: "",
  disabled: false,
  readOnly: false,
  onBlur: undefined,
  onFocus: undefined,
  onClick: undefined,
  tabIndex: undefined,
  onChange: undefined,
  fieldType: undefined,
  hideErrorText: false,
  passwordIconNodeId: "",
};

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  invalid: PropTypes.string,
  tabIndex: PropTypes.string,
  className: PropTypes.string,
  fieldType: PropTypes.string,
  hideErrorText: PropTypes.bool,
  placeholder: PropTypes.string,
  passwordIconNodeId: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

export default TextInput;
