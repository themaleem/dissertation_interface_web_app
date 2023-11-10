import PropTypes from "prop-types";
import Modal from "react-responsive-modal";

import { doNothing } from "../lib/objects";
import "react-responsive-modal/styles.css";

const modalOptions = {
  center: true,
  closeOnEsc: true,
  focusTrapped: false,
  showCloseIcon: false,
  closeOnOverlayClick: true,
};

const ModalWrapper = ({ open, options, modalClass, children, closeModal }) => {
  if (!open) return null;

  const props = {
    ...modalOptions,
    ...options,
    open,
    center: true,
    onClose: closeModal,
    animationDuration: 500,
    classNames: {
      overlay: "modal is-active",
      modal: modalClass || "modal-background",
      modalAnimationIn: "customEnterModalAnimation",
      modalAnimationOut: "customLeaveModalAnimation",
      overlayAnimationIn: "customEnterOverlayAnimation",
      overlayAnimationOut: "customLeaveOverlayAnimation",
    },
  };

  return <Modal {...props}>{children}</Modal>;
};

ModalWrapper.defaultProps = {
  open: false,
  options: {},
  modalClass: null,
  closeModal: doNothing,
};

ModalWrapper.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  modalClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  options: PropTypes.instanceOf(Object),
};

export default ModalWrapper;
