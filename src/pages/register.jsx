import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from ".//login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../actions/registerActions";

export function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              placeholder={"Имя"}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              placeholder={"E-mail"}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              placeholder={"Пароль"}
              icon={"ShowIcon"}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.text_container}>
          <h2 className={styles.text}>
            Уже зарегистрированы?{" "}
            <Link className={styles.link} to="/login">
              Войти
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}
