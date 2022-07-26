import { Avatar, Card, Col, Row, Spin } from "antd";
import React from "react";

const { Meta } = Card;

const Content = (props) => {
  //JSX components to display, the map function is used to iterate over each element and render a JASX component with data in it.
  return (
    <div className="Contents">
      <Row gutter={[8, 8]}>
        {props.results?.map((its, index) => {
          if (props.results.length === index + 1) {
            return (
              <Col xs={{ span: 12 }} md={{ span: 8 }}>
                <Card ref={props.lastRefCalllback} key={its.id}>
                  <Meta
                    avatar={
                      props.type === "Users" ? (
                        <Avatar src={its.avatar_url} />
                      ) : null
                    }
                    title={
                      props.type === "Users" ? (
                        <a href={its.html_url}> {its.login} </a>
                      ) : (
                        <a href={its.html_url}> {its.name} </a>
                      )
                    }
                    description={
                      props.type === "Users"
                        ? "Score: " + its.score
                        : "Stars: " +
                          its.stargazers_count +
                          " Forks: " +
                          its.forks
                    }
                  />
                  <p>
                    {props.type === "Users"
                      ? "Type: " + its.type
                      : "Description: " + its.description}
                  </p>
                  <p>
                    {" "}
                    {props.type === "Users"
                      ? ""
                      : "Owner: " + its["owner"].login}
                  </p>
                  <p>
                    {props.type === "Users"
                      ? ""
                      : "Visibility: " + its.visibility}
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
                      props.type === "Users" ? (
                        <Avatar src={its.avatar_url} />
                      ) : null
                    }
                    title={
                      props.type === "Users" ? (
                        <a href={its.html_url}> {its.login} </a>
                      ) : (
                        <a href={its.html_url}> {its.name} </a>
                      )
                    }
                    description={
                      props.type === "Users"
                        ? "Score: " + its.score
                        : "Stars: " +
                          its.stargazers_count +
                          " Forks: " +
                          its.forks
                    }
                  />
                  <p>
                    {" "}
                    {props.type === "Users"
                      ? "Type: " + its.type
                      : "Description: " + its.description}
                  </p>
                  <p>
                    {" "}
                    {props.type === "Users"
                      ? ""
                      : "Owner: " + its["owner"].login}
                  </p>
                  <p>
                    {props.type === "Users"
                      ? ""
                      : "Visibility: " + its.visibility}
                  </p>
                </Card>
              </Col>
            );
          }
        })}
      </Row>
      <div className="Loader">
        <Spin size="large" spinning={props.isLoading}></Spin>
      </div>
    </div>
  );
  //----------------------------------------------------------------------------------------------------
};

export default Content;
