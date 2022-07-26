import { LOADING } from "../actionTypes";

export default function loadingReducer(state = false, action) {
  switch (action.type) {
    case LOADING:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
