import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import dropDownReducer from "./dropDownReducer";
import resultsReducer from "./resultsReducer";
import remainingReducer from "./remainingReducer";
import loadingReducer from "./loadingReducer";
import persistedReducer from "./persistReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const pReducer = persistReducer(persistConfig, persistedReducer);

const rootReducer = combineReducers({
  searchReducer,
  dropDownReducer,
  resultsReducer,
  remainingReducer,
  loadingReducer,
  pReducer,
});

export default rootReducer;
