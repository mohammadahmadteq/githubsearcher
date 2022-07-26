import { SAVING } from "../actionTypes";

export default function resultsReducer(state = [], action) {
  switch (action.type) {
    case SAVING:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
