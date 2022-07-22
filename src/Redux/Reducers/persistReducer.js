export default function persistReducer(state = { storage: [] }, action) {
  switch (action.type) {
    case "STORING":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
