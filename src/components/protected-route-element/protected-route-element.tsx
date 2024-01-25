import React, { FC, ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../../services/rootReducer";

interface IProtectedRouteElementProps {
  children: ReactElement | null;
  onlyUnAuth?: boolean
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({ children, onlyUnAuth = false }) => {
  const { isAuthChecked, isLoggedIn } = useSelector((state: IRootState) => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRouteElement;
