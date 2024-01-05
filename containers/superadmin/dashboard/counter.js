import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < end) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1);

      // cleanup interval when count reaches the end value
      return () => clearInterval(intervalId);
    }
  }, [count, end]);

  return <h4>{count}</h4>;
};

Counter.propTypes = { end: PropTypes.number.isRequired };

export default Counter;
