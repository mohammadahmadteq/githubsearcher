import { STORING } from "../actionTypes/index";

export function persistData(input) {
  return (dispatch) => {
    dispatch({
      type: STORING,
      payload: input,
    });
  };
}
