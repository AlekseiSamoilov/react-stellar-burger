import styles from "./app-header.module.css";
import { data } from "../../utils/data";
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
          <div className={styles.header_element_white}>
            <BurgerIcon />
            <p className="text text_type_main-small">Конструктор</p>
          </div>
          <div className={styles.header_element_blue}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-small">Лента заказов</p>
          </div>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.header_element_blue}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-small">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
