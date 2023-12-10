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
import LocalStorageRestoration from "../protected-route-element/localStorageRestoration";
import IngredientDetailsPage from "../../pages/ingredientDetailsPage";
import { useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../modal-wrapper";
import DataLoader from "../data-loader/data-loader";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.app}>
            <LocalStorageRestoration>
              <DataLoader />
              <AppHeader />
              <Routes>
                <Route path="/" element={<MainWindow />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/register"
                  element={
                    <ProtectedRouteElement>
                      <RegisterPage />
                    </ProtectedRouteElement>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <ProtectedRouteElement>
                      <ForgotPasswordPage />
                    </ProtectedRouteElement>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <ProtectedRouteElement>
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
            </LocalStorageRestoration>
          </div>
        </DndProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
