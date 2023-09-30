import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay_container} onClick={onClick}></div>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default ModalOverlay;
