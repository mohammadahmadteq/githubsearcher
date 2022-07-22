import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

function setStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}

export const store = setStore();

export const persistor = persistStore(store);
