import { Avatar, Card, Col, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useData } from "./useData";

const { Meta } = Card;
let PageNum = 2;

const Content = () => {
  // Selectors required for operation
  const results = useSelector((state) => state.resultsReducer);
  const type = useSelector((state) => state.dropDownReducer);
  const inputText = useSelector((state) => state.searchReducer);
  const Remaining = useSelector((state) => state.remainingReducer);
  const isLoading = useSelector((state) => state.loadingReducer);
  //--------------------------------------------------------------------------------

  /*useEffect is utilized here to initialize the page numbers back to 0 whenever either 
  the inputText in the searchbox is updarted or the dropdown selection is changed */
  useEffect(() => {
    PageNum = 2;
  }, [type, inputText]);
  const [updateData, concatData] = useData();
  //---------------------------------------------------------------------------------------

  /*This part handles the infinite scroll, IntersectionObserver checks whenever the last element is on screen, 
  which updates the entries. useRef call backs the lastRef call back */
  const observer = useRef(null);

  const lastRefCalllback = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        results.length !== Remaining &&
        isLoading === false
      ) {
        concatData(inputText, type, PageNum);
        PageNum++;
      }
    });
    if (node) observer.current.observe(node);
  });
  //--------------------------------------------------------------------------

  //JSX components to display, the map function is used to iterate over each element and render a JASX component with data in it.
  return (
    <div className="Contents">
      <Row gutter={[8, 8]}>
        {results?.map((its, index) => {
          if (results.length === index + 1) {
            return (
              <Col xs={{ span: 12 }} md={{ span: 8 }}>
                <Card ref={lastRefCalllback} key={its.id}>
                  <Meta
                    avatar={
                      type === "Users" ? <Avatar src={its.avatar_url} /> : null
                    }
                    title={
                      type === "Users" ? (
                        <a href={its.html_url}> {its.login} </a>
                      ) : (
                        <a href={its.html_url}> {its.name} </a>
                      )
                    }
                    description={
                      type === "Users"
                        ? "Score: " + its.score
                        : "Stars: " +
                          its.stargazers_count +
                          " Forks: " +
                          its.forks
                    }
                  />
                  <p>
                    {type === "Users"
                      ? "Type: " + its.type
                      : "Description: " + its.description}
                  </p>
                  <p>
                    {" "}
                    {type === "Users" ? "" : "Owner: " + its["owner"].login}
                  </p>
                  <p>
                    {type === "Users" ? "" : "Visibility: " + its.visibility}
                  </p>
                </Card>
              </Col>
            );
          } else {
            return (
              <Col xs={{ span: 12 }} md={{ span: 8 }}>
                <Card key={its.id}>
                  <Meta
                    avatar={
                      type === "Users" ? <Avatar src={its.avatar_url} /> : null
                    }
                    title={
                      type === "Users" ? (
                        <a href={its.html_url}> {its.login} </a>
                      ) : (
                        <a href={its.html_url}> {its.name} </a>
                      )
                    }
                    description={
                      type === "Users"
                        ? "Score: " + its.score
                        : "Stars: " +
                          its.stargazers_count +
                          " Forks: " +
                          its.forks
                    }
                  />
                  <p>
                    {" "}
                    {type === "Users"
                      ? "Type: " + its.type
                      : "Description: " + its.description}
                  </p>
                  <p>
                    {" "}
                    {type === "Users" ? "" : "Owner: " + its["owner"].login}
                  </p>
                  <p>
                    {type === "Users" ? "" : "Visibility: " + its.visibility}
                  </p>
                </Card>
              </Col>
            );
          }
        })}
      </Row>
      <div className="Loader">
        <Spin size="large" spinning={isLoading}></Spin>
      </div>
    </div>
  );
  //----------------------------------------------------------------------------------------------------
};

export default Content;
