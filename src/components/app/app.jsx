import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import MainWindow from "../main-window/main-window";
import { store } from "../../services/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import Profile from "../../pages/profile/profile";
import { PageNotFound } from "../../pages/error404";

function App() {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <Provider store={store}>
            <AppHeader />
            <Routes>
              <Route path="/" element={<MainWindow />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/profile/*" element={<Profile />} />
              {/* <Route path="/ingredients/:id" element={} /> */}
              <Route path="/404" element={<PageNotFound />} />
            </Routes>
          </Provider>
        </div>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
