import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

interface IProtectedRouteElementProps {
  children: ReactElement | null;
  onlyUnAuth?: boolean
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({ children, onlyUnAuth = false }) => {
  const { isAuthChecked, isLoggedIn } = useAppSelector(state => state.auth);
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
