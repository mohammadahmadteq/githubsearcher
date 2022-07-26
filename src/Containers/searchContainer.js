import * as ActionCreators from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useCallback } from "react";
import { useData } from "../Services/useData";
import { debounce } from "lodash";

function useSearch() {
  //Selectors required for operation
  const type = useSelector((state) => state.dropDownReducer);
  //----------------------------------------------------------

  //Actions required for operations, done via action creators. Actions are destructure and bound by bindActionCreators.
  const dispatch = useDispatch();
  const { storeSearch } = bindActionCreators(ActionCreators, dispatch);
  //-----------------------------------------------------------------------------------------------------

  //Use custom useData hook to get updateData function to call it later.
  const [updateData] = useData();

  /*delay is the function which is utilizing the useCallback hook. We need the usecallback otherwise debounce function will be called everytime input changes
  stacking up multiple debounces and slowing down performance*/
  const delay = useCallback(
    debounce((inputText) => {
      updateData(inputText.target.value, type, 1);
      storeSearch(inputText.target.value);
    }, 1000),
    [type]
  );
  //---------------------------------------------------------------------------------------------

  //Handle input, e is persisted so that it gets passed in the useCallback hook.
  const onTyping = (e) => {
    e.persist();
    delay(e);
  };
  //-------------------------------------------------------------------------------

  return onTyping;
}

export default useSearch;
