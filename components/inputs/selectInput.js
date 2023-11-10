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
  // darkMode,
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

  const hasError = useMemo(() => meta.touched && meta.error, [meta.error, meta.touched]);

  // const styleProps = useMemo(() => {
  //   let borderColor;
  //   if (darkMode) {
  //     borderColor = "rgba(228, 228, 228, 0.11)";
  //   } else {
  //     if (focused) {
  //       borderColor = "1var(--border-color-hover)";
  //     }
  //     borderColor = "var(--border-color-button)";
  //   }

  //   const errorColor = "var(--accent-color-two)";
  //   const obj = {
  //     control: (base, state) => ({
  //       ...base,
  //       boxShadow: "none",
  //       "&:hover": {
  //         borderColor: "#000",
  //       },
  //       borderWidth: "1px",
  //       borderStyle: "solid",
  //       borderColor: meta?.touched && meta?.invalid ? errorColor : state.isFocused ? "#000" : borderColor,
  //     }),
  //     menu: (base) => ({
  //       ...base,
  //       zIndex: 100,
  //       animation: "selectFadeIn 0.2s ease-in-out",
  //     }),
  //   };
  //   if (usePortal)
  //     obj.menuPortal = (base) => ({
  //       ...base,
  //       left: 0,
  //       top: "100%",
  //       zIndex: 4001,
  //     });
  //   return obj;
  // }, [darkMode, usePortal, focused, meta?.touched, meta?.invalid]);

  // const theme = useCallback(
  //   (base) => {
  //     const obj = { ...base };
  //     if (darkMode) {
  //       obj.colors = {
  //         ...base.colors,
  //         primary: "#f3f3f5",
  //         neutral0: "#1b2127",
  //         primary25: "#393e45",
  //         neutral5: "#f5f5f52e",
  //         primary50: "#f5f5f52e",
  //         neutral80: "#ffffff8c",
  //         neutral10: "#f5f5f52e",
  //       };
  //     }
  //     return obj;
  //   },
  //   [darkMode],
  // );

  const idName = useMemo(() => (id.length ? { id } : {}), [id]);

  return (
    <div style={{ position: "relative" }} className="variable-group-inner" ref={wrapper}>
      <Select
        {...idName}
        // theme={theme}
        isMulti={multi}
        options={options}
        name={input?.name}
        // styles={styleProps}
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
        className={`${className}${indicateError ? `${meta.touched ? `${meta.valid ? "" : " has-error"}` : ""}` : ""}`}
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
