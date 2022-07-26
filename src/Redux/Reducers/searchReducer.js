import initialState from "./initialState";
import { SEARCHING } from "../actionTypes";

export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case SEARCHING:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
