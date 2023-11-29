import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//login.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../actions/resetPasswordActions";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.passwordRequest
  );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(email));
  };

  useEffect(() => {
    if (success) {
      navigate("/reset-password");
    }
  }, [success, navigate]);

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
            <a className={styles.link} href="/login">
              Войти
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}
