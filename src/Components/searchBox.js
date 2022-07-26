import { Input } from "antd";
import React from "react";

function SearchBox(props) {
  //JSX Componenets.
  return (
    <Input
      size="default"
      placeholder="Start typing to search"
      onChange={props.onChange}
    />
  );
}
//---------------------------------------------

export default SearchBox;
