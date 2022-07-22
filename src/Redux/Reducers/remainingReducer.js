export default function remainingReducer(state = 0, action) {
  switch (action.type) {
    case "REMAINING":
      state = action.payload;
      return state;
    default:
      return state;
  }
}
