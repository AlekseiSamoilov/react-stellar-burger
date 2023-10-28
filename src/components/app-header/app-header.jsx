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
          <a href="#" className={styles.header_element_white}>
            <BurgerIcon />
            <p className="text text_type_main-small">Конструктор</p>
          </a>
          <a href="#" className={styles.header_element_blue}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-small">Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={styles.header_element_blue}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-small">Личный кабинет</p>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
