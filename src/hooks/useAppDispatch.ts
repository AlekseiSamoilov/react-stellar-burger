import { useDispatch } from "react-redux";
import { TDispatch } from "../services/store";

type TDispatchFunc = () => TDispatch;
export const useAppDispatch: TDispatchFunc = useDispatch;

// export const useAppDispatch = () => useDispatch<TDispatch>();