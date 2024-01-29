// DataLoader.jsx
import { FC, useEffect } from "react";
import { TServerResponse, request } from "../../utils/request";
import { setIngredients } from "../../actions/dataLoadActions";
import { IIngredientsData } from "../../services/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type TDataLoaderResponse = TServerResponse<{
  message?: string;
  data: IIngredientsData
}>

const DataLoader: FC = () => {
  const dispatch = useAppDispatch();

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
