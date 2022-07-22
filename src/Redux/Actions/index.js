export function dropActions(option) {
  return (dispatch) => {
    dispatch({
      type: "SelOption",
      payload: option,
    });
  };
}

export function storeSearch(input) {
  return (dispatch) => {
    dispatch({
      type: "SEARCHING",
      payload: input,
    });
  };
}

export function saveResults(input) {
  return (dispatch) => {
    dispatch({
      type: "SAVING",
      payload: input,
    });
  };
}

export function Remaining(input) {
  return (dispatch) => {
    dispatch({
      type: "REMAINING",
      payload: input,
    });
  };
}

export function startLoading(input) {
  return (dispatch) => {
    dispatch({
      type: "LOADING",
      payload: input,
    });
  };
}

export function persistData(input) {
  return (dispatch) => {
    dispatch({
      type: "STORING",
      payload: input,
    });
  };
}

export * as ActionCreators from "./index";
