import {
  Button,
  EditIcon,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { updateUserInfo } from "../../actions/authActions";
import { IUserData } from "../../services/types/data";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface IEditState {
  name: boolean;
  password: boolean;
  email: boolean;
}

const ProfileInfo: FC = () => {
  const authState = useAppSelector(state => state.auth);
  const { user } = authState;

  const [editData, setEditData] = useState<IUserData>({
    name: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState<IEditState>({ name: false, password: false, email: false});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setEditData({ name: user.name, email: user.email, password: user.password });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (field: keyof IEditState) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(editData));
    setIsEditing({ name: false, email: false, password: false });
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
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
            <EditIcon type="primary" />
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
            <EditIcon type="primary"/>
          </div>
        </div>
        <div className={style.input_box}>
          <Input
            onChange={handleChange}
            name="password"
            placeholder="Пароль"
            value={editData.password || ""}
            type="password"
            disabled={!isEditing.password}
          />
          <div className={style.icon} onClick={() => handleEdit("password")}>
            <EditIcon type="primary"/>
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
