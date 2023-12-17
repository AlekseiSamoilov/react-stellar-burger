import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header_main}>
      <div className={styles.header}>
        <div className={styles.header_element_duo}>
          <Link to="/" className={styles.header_element_white}>
            <BurgerIcon />
            <p className="text text_type_main-small">Конструктор</p>
          </Link>
          <Link to="#" className={styles.header_element_blue}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-small">Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to="/profile" className={styles.header_element_blue}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-small">Личный кабинет</p>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;
