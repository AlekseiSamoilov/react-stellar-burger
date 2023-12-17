// DataLoader.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../../utils/request";
import { setIngredients } from "../../actions/dataLoadActions";

const DataLoader = () => {
  const dispatch = useDispatch();

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
