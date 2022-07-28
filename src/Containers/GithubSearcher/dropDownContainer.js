import { message } from "antd";
import * as ActionCreators from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useData } from "../../Services/useData";

function useDropDown() {
  //Selectors required for operations.
  const type = useSelector((state) => state.dropDownReducer);
  const inputText = useSelector((state) => state.searchReducer);

  //----------------------------------------------------------

  //Use custom useData hook to get updateData function to call it later.
  const [updateData] = useData();

  //Actions required for operations, done via action creators. Actions are destructure and bound by bindActionCreators.
  const dispatch = useDispatch();

  const { dropActions, saveResults } = bindActionCreators(
    ActionCreators,
    dispatch
  );
  //----------------------------------------------------------------

  //Update the states when option on the menu is clicked.
  const handleMenuClick = (e) => {
    saveResults([]);
    const textType = e.key === "1" ? "Users" : "Repos";
    dropActions(textType);
    message.info("Searching for " + textType);
    updateData(inputText, textType, 1);
  };

  //---------------------------------------------------------

  return [type, handleMenuClick];
}

export default useDropDown;
