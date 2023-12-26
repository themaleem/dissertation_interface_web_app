import PropTypes from "prop-types";

import { doNothing } from "../../lib/objects";

const RadioInput = ({
  id,
  meta,
  input,
  label,
  checked,
  onChange,
  disabled,
}) => {
  const handleChange = (event) => {
    if (disabled) return;

    if (onChange) {
      onChange(event);
    } else {
      input.onChange(event);
    }
  };

  const handleLabelClick = () => {
    if (input.checked || disabled) return;

    handleChange({
      preventDefault: doNothing,
      target: { value: input.value },
      currentTarget: { value: input.value },
    });
  };

  return (
    <label htmlFor={id} className="radio-label" onClick={handleLabelClick}>
      <input
        {...input}
        type="radio"
        disabled={disabled}
        className="radio-label"
        onChange={handleChange}
        checked={input ? input.checked : checked}
      />
      <span className="inner-span-label">{label}</span>
      <div className="radio-background" />
      {/* {meta.error && meta.touched && <p className="error-text">{meta.error}</p>}
            {meta.submitError && <p className="error-text">{meta.submitError}</p>} */}
    </label>
  );
};

RadioInput.defaultProps = {
  meta: {},
  input: {},
  className: "",
  checked: false,
  disabled: false,
  label: undefined,
  onChange: undefined,
  renderLabel: undefined,
  labelClassName: undefined,
};

RadioInput.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  renderLabel: PropTypes.func,
  labelClassName: PropTypes.string,
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.objectOf(PropTypes.any),
};

export default RadioInput;
