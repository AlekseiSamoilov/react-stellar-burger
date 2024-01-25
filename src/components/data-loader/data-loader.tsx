// DataLoader.jsx
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { setIngredients } from "../../actions/dataLoadActions";
import { Dispatch } from "redux";

const DataLoader: FC = () => {
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    request("/ingredients")
      .then((result) => {
        dispatch(setIngredients(result.data));
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  }, [dispatch]);

  return null;
};

export default DataLoader;
