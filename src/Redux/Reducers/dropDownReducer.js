import initialState from "./initialState";

export default function dropDownReducer(state = initialState.dropDown, action) {
  switch (action.type) {
    case "SelOption":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
