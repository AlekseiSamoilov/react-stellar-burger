import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//login.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../actions/resetPasswordActions";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.passwordReset
  );

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTokenChange = (e) => setToken(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token));
  };

  // useEffect(() => {
  //   if (success) {
  //     navigate("/login");
  //   }
  // }, [success, navigate]);

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
