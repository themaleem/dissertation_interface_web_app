import PropTypes from "prop-types";
import { forwardRef } from "react";

const FileUploadInput = forwardRef((props, ref) => {
  const { id, name, input, onChange, className } = props;

  return (
    <input
      id={id}
      ref={ref}
      {...input}
      type="file"
      onChange={onChange}
      className={className}
      name={input?.name || name}
      style={{ display: "none" }}
      accept="image/png, image/jpeg"
    />
  );
});

FileUploadInput.defaultProps = {
  id: "",
  name: "",
  meta: {},
  input: {},
  className: "",
  disabled: false,
  onClick: undefined,
  onChange: undefined,
};

FileUploadInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any),
  input: PropTypes.objectOf(PropTypes.any),
};

FileUploadInput.displayName = "FileUploadInput";

export default FileUploadInput;
