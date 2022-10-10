import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert }) => {
  // this is where we remove the alert after 3s
  useEffect(() => {
    const timeout = setTimeout(() => {
      // we just invoke our function because we already have default values;
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {/* We set a conditional class adding */}
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
