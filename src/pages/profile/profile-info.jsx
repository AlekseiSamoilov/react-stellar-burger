import {
  EditIcon,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const ProfileInfo = () => {
  return (
    <div className={style.profile_info_container}>
      <div className={style.input_box}>
        <Input placeholder="Имя" value="Марк" />
        <div className={style.icon}>
          <EditIcon />
        </div>
      </div>
      <div className={style.input_box}>
        <Input placeholder="Логин" value="E-mail" />
        <div className={style.icon}>
          <EditIcon />
        </div>
      </div>
      <div className={style.input_box}>
        <Input placeholder="Пароль" value="Марк" type="password" />
        <div className={style.icon}>
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
