import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { restoreSession } from "../../actions/authActions";
import { checkAndRestoreSession } from "../../actions/authActions";

const LocalStorageRestoration = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAndRestoreSession());
  }, [dispatch]);

  return <>{children}</>;
};

export default LocalStorageRestoration;
