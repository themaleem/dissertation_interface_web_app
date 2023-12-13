import { useRef } from "react";
import PropTypes from "prop-types";

const NumberInput = ({
  id,
  min,
  max,
  meta,
  input,
  value,
  onBlur,
  onKeyUp,
  onClick,
  disabled,
  readOnly,
  onChange,
  isInteger,
  className,
  labelText,
  placeholder,
  decimalPlaces,
  allowNegative,
}) => {
  const inputRef = useRef();

  // use /^(0|[1-9]\d*)(\.\d+)?$/.test(value) to validate for float field
  const getValue = (event) => {
    let prefix = "";
    let { value: val } = event.currentTarget;

    if (val === "") return val;

    if (allowNegative) {
      if (val === "-") return val;
      if (val.startsWith("-")) {
        prefix = val[0];
        val = val.substring(1);
      }
    }

    if (
      (isInteger && /^[0-9]\d*$/.test(val)) ||
      (!isInteger && /^(0|[1-9]\d*)[.]?$|^(0|[1-9]\d*)(\.\d+)?$/.test(val))
    ) {
      if ((min && parseFloat(val) < min) || (max && parseFloat(val) > max))
        return undefined;

      if (decimalPlaces && !isInteger) {
        const [beforeDecimal, afterDecimal] = val.split(".", 2);
        if (afterDecimal && afterDecimal.length > decimalPlaces)
          val = `${beforeDecimal}.${afterDecimal.slice(0, decimalPlaces)}`;
      }

      return `${prefix}${val}`;
    }

    return undefined;
  };

  const change = (event) => {
    if (disabled) return;

    const val = getValue(event);
    if (val !== undefined) {
      if (onChange) {
        onChange(event, val);
      } else {
        input.onChange(val);
      }
    }
  };

  const blur = (event) => {
    const val = getValue(event);
    if (onBlur) onBlur(event, val);
    input?.onBlur?.(val);
  };

  const click = (event) => {
    onClick?.(event);
  };

  const focus = (event) => {
    input?.onFocus?.(event);
  };

  const hasError = meta.touched && meta.invalid;

  const attrs = {
    id,
    onKeyUp,
    disabled,
    readOnly,
    onBlur: blur,
    onFocus: focus,
    onClick: click,
    onChange: change,
    placeholder: placeholder || "",
    className: `${className}${`${hasError ? " has-error" : ""}`}`,
  };

  if (min !== undefined) attrs.min = min; // because of 0
  if (max !== undefined) attrs.max = max;
  if (value !== undefined) attrs.value = value;

  return (
    <div
      className={`control${
        meta.error && meta.touched ? " has-error has-text-below" : ""
      }`}
    >
      <input {...input} {...attrs} ref={inputRef} />
      <label htmlFor={id}> {labelText}</label>

      {meta.submitError && <p className="error-text">{meta.submitError}</p>}
    </div>
  );
};

NumberInput.defaultProps = {
  id: "",
  meta: {},
  input: {},
  isOtp: false,
  className: "",
  min: undefined,
  max: undefined,
  readOnly: false,
  disabled: false,
  placeholder: "",
  value: undefined,
  isInteger: false,
  onBlur: undefined,
  onKeyUp: undefined,
  onClick: undefined,
  showSpinner: false,
  onChange: undefined,
  decimalPlaces: null,
  allowNegative: false,
};

NumberInput.propTypes = {
  id: PropTypes.string,
  isOtp: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.number,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isInteger: PropTypes.bool,
  className: PropTypes.string,
  showSpinner: PropTypes.bool,
  allowNegative: PropTypes.bool,
  placeholder: PropTypes.string,
  decimalPlaces: PropTypes.number,
  labelText: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

NumberInput.displayName = "NumberInput";
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

export default NumberInput;
