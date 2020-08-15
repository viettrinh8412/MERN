import React, { Component } from "react";
import ContentNewsLeft from "./ContentNewsLeft";
import ContentNewsRight from "./ContentNewsRight/ContentNewsRight";

class NewsContent extends Component {
  render() {
    return (
      <div>
        <div className="container-body">
          <ContentNewsLeft />
          <ContentNewsRight />
        </div>
      </div>
    );
  }
}

export default NewsContent;
