import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//login.module.css";
import { ChangeEvent, useState } from "react";
import { resetPassword } from "../actions/resetPasswordActions";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

export function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.passwordReset);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              placeholder={"Введите новый пароль"}
              icon={"ShowIcon"}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></Input>
            <Input
              placeholder={"Введите код из письма"}
              type="text"
              onChange={handleTokenChange}
              value={token}
            ></Input>
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            {loading ? "Загрузка..." : "Сохранить"}
          </Button>
        </form>
        <div className={styles.text_container}>
          <h2 className={styles.text}>
            Вспомнили пароль?{" "}
            <a className={styles.link} href="/login">
              Войти
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}
