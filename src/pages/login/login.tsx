import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login.module.css";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";



export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const error = useAppSelector(state => state.auth.isError);
  const errorMessage = useAppSelector(state => state.auth.errorMessage);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Вход</h1>
        {error && <div className={styles.error_message}>{errorMessage}</div>}
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
            <Link className={styles.link} to="/register">
              Зарегистрироваться
            </Link>
          </h2>
          <h2 className={styles.text}>
            Забыли пароль?{" "}
            <Link className={styles.link} to="/forgot-password">
              Восстановить пароль
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
