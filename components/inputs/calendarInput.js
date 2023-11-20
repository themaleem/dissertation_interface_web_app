import PropTypes from "prop-types";
import { Calendar } from "primereact/calendar";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";

const CalendarInput = ({
  id,
  name,
  meta,
  input,
  showTime,
  showIcon,
  className,
}) => {
  return (
    <>
      <Calendar
        id={id}
        name={name}
        showTime={showTime}
        showIcon={showIcon}
        className={className}
        dateFormat="dd/mm/yy"
        onChange={(e) => input.onChange(e.value)}
        value={input.value ? new Date(input.value) : null}
      />
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </>
  );
};

CalendarInput.defaultProps = {
  id: "",
  meta: {},
  className: "",
  input: undefined,
  showTime: false,
  showIcon: false,
};

CalendarInput.propTypes = {
  id: PropTypes.string,
  showIcon: PropTypes.bool,
  showTime: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.objectOf(PropTypes.any),
};

export default CalendarInput;
