import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../main-window/main-window";
import { store } from "../../services/store";
import { Provider, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import Profile from "../../pages/profile/profile";
import { PageNotFound } from "../../pages/error404";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetailsPage from "../../pages/ingredientDetailsPage";
import ModalWrapper from "../modal-wrapper";
import DataLoader from "../data-loader/data-loader";
import { useEffect } from "react";
// import { checkAuthStatus } from "../../actions/authActions";
import { checkAndRestoreSession } from "../../actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAndRestoreSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <DataLoader />
          <AppHeader />
          <Routes>
            <Route path="/" element={<MainWindow />} />
            <Route
              path="/login"
              element={
                <ProtectedRouteElement onlyUnAuth={true}>
                  <LoginPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteElement onlyUnAuth={true}>
                  <RegisterPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElement onlyUnAuth={true}>
                  <ForgotPasswordPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElement onlyUnAuth={true}>
                  <ResetPasswordPage />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProtectedRouteElement>
                  <Profile />
                </ProtectedRouteElement>
              }
            />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetailsPage />}
            />
            <Route path="/404" element={<PageNotFound />} />
          </Routes>
          <ModalWrapper />
        </div>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
