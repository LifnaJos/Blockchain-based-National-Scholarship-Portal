import React, { useState, useEffect } from "react";

const CommonNotification = ({ title, backgroundColor, message, handleDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  const notificationStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    border: `1px solid ${backgroundColor === "#d4edda" ? "#28a745" : "#ffc107"}`,
    backgroundColor: backgroundColor,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      handleDismiss();
    }, 10000); 

    return () => clearTimeout(timeout);
  }, [handleDismiss]);

  return (
    <>
      {isVisible && (
        <div style={notificationStyle}>
          <div className="toast-header">
            <strong className="me-auto">{title}</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      )}
    </>
  );
};

const Notification = (props) => {
  const handleDismiss = () => {
    // Additional actions on dismiss if needed
  };

  return (
    <CommonNotification
      title="Intelligent Scholarship Portal"
      backgroundColor="#fff3cd"
      message={props.message}
      handleDismiss={handleDismiss}
    />
  );
};

const SuccessNotification = (props) => {
  const handleDismiss = () => {
    // Additional actions on dismiss if needed
  };

  return (
    <CommonNotification
      title="Intelligent Scholarship Portal"
      backgroundColor="#d4edda"
      message={props.message}
      handleDismiss={handleDismiss}
    />
  );
};

export { Notification, SuccessNotification };
