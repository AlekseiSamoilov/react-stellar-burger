// DataLoader.jsx
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TServerResponse, request } from "../../utils/request";
import { setIngredients } from "../../actions/dataLoadActions";
import { Dispatch } from "redux";
import { AppDispatch } from "../../services/store";
import { IIngredientsData } from "../../services/types";

type TDataLoaderResponse = TServerResponse<{
  message?: string;
  data: IIngredientsData
}>

const DataLoader: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    request<TDataLoaderResponse>("/ingredients")
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
