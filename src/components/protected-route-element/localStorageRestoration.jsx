import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "../../actions/authActions";

const LocalStorageRestoration = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <>{children}</>;
};

export default LocalStorageRestoration;
