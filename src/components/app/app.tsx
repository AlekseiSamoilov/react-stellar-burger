import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../main-window/main-window";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetailsPage from "../../pages/ingredient-detail-page/ingredientDetailsPage";
import ModalWrapper from "../modal/modal-wrapper";
import DataLoader from "../data-loader/data-loader";
import { Dispatch, useEffect } from "react";
import Feed from "../../pages/feed/feed";
import { checkAndRestoreSession } from "../../actions/authActions";
import Modal from "../modal/modal";
import OrderInformation from "../modal/order-information/order-information";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../actions/orderActions";
import OrderDetailsPage from "../../pages/feed/order-details-page";
import { IRootState } from "../../services/rootReducer";
import {  TDispatch } from "../../services/store";

function App() {
  const dispatch: TDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAndRestoreSession());
  }, [dispatch]);

  const showModal = useSelector((state: IRootState) => state.order.showModal);
  const currentOrder = useSelector((state: IRootState) => state.orders.currentOrder);

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
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:number" element={<OrderDetailsPage />} />
            <Route
              path="/profile/orders/:number"
              element={<OrderDetailsPage />}
            />
          </Routes>
          {showModal && currentOrder && (
            <Modal closeModal={closeModal}>
              <OrderInformation order={currentOrder} />
            </Modal>
          )}
          <ModalWrapper />
        </div>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
