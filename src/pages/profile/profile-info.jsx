import {
  Button,
  EditIcon,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../actions/authActions";

const ProfileInfo = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

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

  const handleSave = (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSave} className={style.form_box}>
        <div className={style.input_box}>
          <Input
            placeholder="Имя"
            value={editData.name || ""}
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
            value={editData.email || ""}
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
            value={editData.password || ""}
            type="password"
            disabled={!isEditing.password}
          />
          <div className={style.icon} onClick={() => handleEdit("password")}>
            <EditIcon />
          </div>
        </div>
        {(isEditing.name || isEditing.email || isEditing.password) && (
          <div className={style.button_container}>
            <Button type="secondary" onClick={handleCancel} htmlType="submit">
              Отмена
            </Button>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
