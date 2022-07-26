import { SelOption } from "../actionTypes/index";

export function dropActions(option) {
  return (dispatch) => {
    dispatch({
      type: SelOption,
      payload: option,
    });
  };
}
