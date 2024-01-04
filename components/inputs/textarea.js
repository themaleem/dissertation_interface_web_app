import PropTypes from "prop-types";
import { useRef, useCallback } from "react";

const TextArea = ({
  id,
  meta,
  name,
  value,
  input,
  onBlur,
  onFocus,
  invalid,
  disabled,
  onChange,
  className,
  labelText,
  placeholder,
  hideErrorText,
}) => {
  const inputRef = useRef();

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
      className={`control has-textarea${
        meta.error && meta.touched ? " has-error has-text-below" : ""
      }`}
    >
      <textarea
        id={id}
        onBlur={blur}
        ref={inputRef}
        onFocus={focus}
        onChange={change}
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        name={input.name || name}
        value={input?.value || value}
        className={`${className}${`${
          meta.touched ? `${meta.valid ? "" : " error"}` : ""
        }`}`}
      />
      {meta.error && meta.error.trim() && meta.touched && !hideErrorText && (
        <p className="help is-danger">{meta.error}</p>
      )}
      <label htmlFor={id}> {labelText}</label>

      {meta.submitError && !meta.dirtySinceLastSubmit && (
        <p className="error-messager">{meta.submitError}</p>
      )}
      {invalid.trim().length > 1 && <p className="error-messager">{invalid}</p>}
    </div>
  );
};

TextArea.defaultProps = {
  id: "",
  name: "",
  meta: {},
  input: {},
  value: "",
  invalid: "",
  className: "",
  placeholder: "",
  disabled: false,
  onBlur: undefined,
  onFocus: undefined,
  onChange: undefined,
  hideErrorText: false,
};

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  invalid: PropTypes.string,
  className: PropTypes.string,
  hideErrorText: PropTypes.bool,
  placeholder: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

export default TextArea;
