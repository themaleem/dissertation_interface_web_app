import Select from "react-select";
import PropTypes from "prop-types";
import { useRef, useMemo, useState, useCallback } from "react";

const SelectInput = ({
  id,
  meta,
  multi,
  input,
  value,
  options,
  onChange,
  disabled,
  usePortal,
  clearable,
  className,
  searchable,
  placeholder,
  defaultValue,
  menuPlacement,
  indicateError,
  maxMenuHeight,
  getOptionValue,
  getOptionLabel,
  menuShouldScrollIntoView,
}) => {
  const wrapper = useRef();
  const [focused, setFocused] = useState(false);

  const onInputFocus = useCallback(
    (event) => {
      setFocused(true);
      input?.onFocus(event);
    },
    [input],
  );

  const onInputBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleChange = useCallback(
    (event) => {
      if (input.onChange && event != null) {
        input.onChange(event);
      } else {
        input.onChange(null);
      }
    },
    [input],
  );

  const hasError = useMemo(
    () => meta.touched && meta.error,
    [meta.error, meta.touched],
  );

  const idName = useMemo(() => (id.length ? { id } : {}), [id]);

  return (
    <div
      style={{ position: "relative" }}
      className="variable-group-inner"
      ref={wrapper}
    >
      <Select
        {...idName}
        isMulti={multi}
        options={options}
        name={input?.name}
        onBlur={onInputBlur}
        isDisabled={disabled}
        onFocus={onInputFocus}
        isClearable={clearable}
        isSearchable={searchable}
        placeholder={placeholder}
        defaultValue={defaultValue}
        menuPlacement={menuPlacement}
        value={input?.value || value}
        maxMenuHeight={maxMenuHeight}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onChange={onChange || handleChange}
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        menuPortalTarget={usePortal ? wrapper.current : undefined}
        className={`${className}${
          indicateError
            ? `${meta.touched ? `${meta.valid ? "" : " has-error"}` : ""}`
            : ""
        }`}
      />
      {hasError ? <p className="error-text">{meta.error}</p> : ""}
      {meta.submitError && <p className="error-text">{meta.submitError}</p>}
    </div>
  );
};

SelectInput.defaultProps = {
  id: "",
  meta: {},
  multi: false,
  className: "",
  // darkMode: false,
  disabled: false,
  input: undefined,
  usePortal: false,
  clearable: false,
  value: undefined,
  searchable: false,
  onChange: undefined,
  menuPlacement: "auto",
  defaultValue: undefined,
  maxMenuHeight: undefined,
  getOptionValue: undefined,
  getOptionLabel: undefined,
  menuShouldScrollIntoView: true,
  placeholder: "Select an option",
};

SelectInput.propTypes = {
  id: PropTypes.string,
  multi: PropTypes.bool,
  // darkMode: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  usePortal: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  getOptionValue: PropTypes.func,
  menuPlacement: PropTypes.string,
  getOptionLabel: PropTypes.func,
  maxMenuHeight: PropTypes.number,
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  value: PropTypes.instanceOf(Object),
  menuShouldScrollIntoView: PropTypes.bool,
  defaultValue: PropTypes.instanceOf(Object),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SelectInput;
