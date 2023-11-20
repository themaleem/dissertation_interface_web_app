import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import { useMemo, useState, useCallback } from "react";

const AsyncSelectInput = ({
  meta,
  input,
  value,
  error,
  multi,
  disabled,
  onChange,
  errorMsg,
  className,
  showValue,
  clearable,
  searchable,
  loadOptions,
  placeholder,
  defaultValue,
  cacheOptions,
  menuPlacement,
  defaultOptions,
  getOptionLabel,
  getOptionValue,
  backspaceRemovesValue,
  menuShouldScrollIntoView,
}) => {
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

  const errorComponent = useMemo(
    () => <p className="text-danger"> {errorMsg} </p>,
    [errorMsg],
  );

  return (
    <div>
      <AsyncSelect
        isMulti={multi}
        name={input?.name}
        onBlur={onInputBlur}
        isDisabled={disabled}
        className={className}
        onFocus={onInputFocus}
        isClearable={clearable}
        placeholder={placeholder}
        loadOptions={loadOptions}
        isSearchable={searchable}
        cacheOptions={cacheOptions}
        defaultValue={defaultValue}
        menuPlacement={menuPlacement}
        value={input?.value || value}
        defaultOptions={defaultOptions}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        controlShouldRenderValue={showValue}
        onChange={onChange || input.onChange}
        backspaceRemovesValue={backspaceRemovesValue}
        menuShouldScrollIntoView={menuShouldScrollIntoView}
      />
      {error ? errorComponent : ""}
      {meta.error && !meta.pristine && (
        <p className="error-text">{meta.error}</p>
      )}
      {meta.submitError && <p className="error-text">{meta.submitError}</p>}
    </div>
  );
};

AsyncSelectInput.defaultProps = {
  meta: {},
  multi: false,
  className: "",
  showValue: true,
  disabled: false,
  darkMode: false,
  clearable: false,
  input: undefined,
  value: undefined,
  searchable: false,
  cacheOptions: true,
  onChange: undefined,
  menuPlacement: "auto",
  loadOptions: undefined,
  menuPosition: "absolute",
  defaultValue: undefined,
  defaultOptions: undefined,
  getOptionValue: undefined,
  getOptionLabel: undefined,
  backspaceRemovesValue: true,
  menuShouldScrollIntoView: true,
  placeholder: "Select an option",
};

AsyncSelectInput.propTypes = {
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  showValue: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  loadOptions: PropTypes.func,
  className: PropTypes.string,
  cacheOptions: PropTypes.bool,
  placeholder: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  menuPlacement: PropTypes.string,
  input: PropTypes.instanceOf(Object),
  value: PropTypes.instanceOf(Object),
  backspaceRemovesValue: PropTypes.bool,
  menuShouldScrollIntoView: PropTypes.bool,
  meta: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.instanceOf(Array),
  defaultOptions: PropTypes.instanceOf(Array),
};

export default AsyncSelectInput;
