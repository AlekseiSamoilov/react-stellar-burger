import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import React, { FC } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProfileInfo from "./profile-info";
import OrderHistory from "./order-history";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const activeLink = (path: string): boolean => {
    const currentPath = location.pathname;
    return (
      (currentPath === "/profile" && path === "profile-info") ||
      currentPath.endsWith(path)
    );
  };

  return (
    <div className={style.container}>
      <div className={style.navigation_container}>
        <Link
          to="profile-info"
          className={
            activeLink("profile-info") ? style.active : style.navigation_item
          }
        >
          Профиль
        </Link>
        <Link
          to="orders"
          className={
            activeLink("orders") ? style.active : style.navigation_item
          }
        >
          История заказов
        </Link>
        <Button
          htmlType="button"
          className={style.navigation_item}
          onClick={handleLogout}
        >
          Выход
        </Button>
        <p className={style.navigation_discription}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={style.info_container}>
        <Routes>
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route index element={<ProfileInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
