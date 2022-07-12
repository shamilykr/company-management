import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import companyReducer from "containers/company-list/companySlice";

export const store = configureStore({
  reducer: {
    companies: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
