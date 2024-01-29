import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState, IRootState } from "../services/rootReducer";


export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;