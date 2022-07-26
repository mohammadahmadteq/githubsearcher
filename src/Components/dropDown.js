import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import React from "react";

function DropMenu(props) {
  //JSX Components for rendering.
  const menu = (
    <Menu
      onClick={props.handleMenuClick}
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
          {props.type}
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
