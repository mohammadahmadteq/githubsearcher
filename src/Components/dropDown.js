import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space } from "antd";
import React from "react";
import * as ActionCreators from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useData } from "./useData";

function DropMenu() {
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

  //JSX Components for rendering.
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { key: "1", label: "Users" },
        { key: "2", label: "Repos" },
      ]}
    />
  );

  return (
    <Space>
      <Dropdown overlay={menu}>
        <Button>
          {type}
          <Space>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
}
//-----------------------------------------------------------
export default DropMenu;
