import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import jobReducer from "./features/jobs/jobSlice";
import jobsSaga from "./features/jobs/jobSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(jobsSaga);

export default store;
