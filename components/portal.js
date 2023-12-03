import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import useIsClient from "../containers/hooks/useIsClient";

const Portal = ({ id, children, childClass, childElement }) => {
  const isClient = useIsClient();

  const [child, setChild] = useState();

  useEffect(() => {
    if (isClient && !child) {
      const child = document.createElement(childElement);
      if (childClass) child.setAttribute("class", childClass);
      setChild(child);
    }
  }, [isClient, childElement, childClass]);

  useEffect(() => {
    let mount;
    const element = child;
    if (element) {
      mount = document.getElementById(id);
      mount.appendChild(element);
    }
    return () => {
      if (element && mount) mount.removeChild(element);
    };
  }, [child, id]);

  return child ? createPortal(children, child) : null;
};

Portal.defaultProps = {
  childElement: "div",
  childClass: undefined,
};

Portal.propTypes = {
  childClass: PropTypes.string,
  childElement: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Portal;
