import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordRequest } from "../../actions/resetPasswordActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.passwordRequest);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(email));
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              placeholder={"Укажите E-mail"}
              type="email"
              onChange={handleEmailChange}
              value={email}
              name="email"
            ></Input>
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            {" "}
            {loading ? "Загрузка..." : "Восстановить"}
          </Button>
        </form>
        <div className={styles.text_container}>
          <h2 className={styles.text}>
            Вспомнили пароль?{" "}
            <Link className={styles.link} to="/login">
              Войти
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
