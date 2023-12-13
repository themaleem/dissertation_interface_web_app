import { createRef } from "react";
import { Toast } from "primereact/toast";
import { capitalize } from "../../lib/objects";

const globalToastRef = createRef();

export const showNotification = ({
  severity = "error",
  summary = `${capitalize(severity)} Message`,
  detail = "Something went wrong",
  life = 3000,
} = {}) => {
  return globalToastRef.current.show({
    severity,
    summary,
    detail,
    life,
  });
};

const Notification = () => {
  // @note severity can be info, success, warn or error

  return <Toast ref={globalToastRef} />;
};

export default Notification;
