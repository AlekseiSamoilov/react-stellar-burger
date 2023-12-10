import {
  Button,
  EditIcon,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserInfo } from "../../actions/userActions";
import { updateUserInfo } from "../../actions/authActions";

const ProfileInfo = () => {
  const authState = useSelector((state) => state.auth);
  // console.log("Auth state:", authState);
  const { user } = authState;
  // console.log("User data:", user);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setEditData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = () => {
    dispatch(updateUserInfo(editData));
    setIsEditing({ name: false, email: false, password: false });
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setIsEditing({ name: false, email: false, password: false });
  };

  return (
    <div className={style.profile_info_container}>
      <div className={style.input_box}>
        <Input
          placeholder="Имя"
          value={editData.name}
          onChange={handleChange}
          name="name"
          disabled={!isEditing.name}
        />
        <div className={style.icon} onClick={() => handleEdit("name")}>
          <EditIcon />
        </div>
      </div>
      <div className={style.input_box}>
        <Input
          placeholder="Логин"
          value={editData.email}
          onChange={handleChange}
          name="email"
          disabled={!isEditing.email}
        />
        <div className={style.icon} onClick={() => handleEdit("email")}>
          <EditIcon />
        </div>
      </div>
      <div className={style.input_box}>
        <Input
          name="password"
          placeholder="Пароль"
          value={editData.password}
          type="password"
          disabled={!isEditing.password}
        />
        <div className={style.icon} onClick={() => handleEdit("password")}>
          <EditIcon />
        </div>
      </div>
      {(isEditing.name || isEditing.email || isEditing.password) && (
        <div className={style.button_container}>
          <Button type="secondary" onClick={handleCancel}>
            Отмена
          </Button>
          <Button type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
