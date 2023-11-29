import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//login.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMessage, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (!isLoading && !isError && isLoggedIn) {
      navigate("/");
    }
  }, [isLoading, isError, isLoggedIn, navigate]);

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Вход</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              placeholder="E-mail"
              onChange={handleEmailChange}
              value={email}
              name="email"
            />
            <Input
              placeholder="Пароль"
              type="password"
              icon="ShowIcon"
              onChange={handlePasswordChange}
              value={password}
              name="password"
            />
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Войти
          </Button>
        </form>
        <div className={styles.text_container}>
          <h2 className={styles.text}>
            Вы - новый пользователь?{" "}
            <a className={styles.link} href="/register">
              Зарегистрироваться
            </a>
          </h2>
          <h2 className={styles.text}>
            Забыли пароль?{" "}
            <a className={styles.link} href="/forgot-password">
              Восстановить пароль
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}
