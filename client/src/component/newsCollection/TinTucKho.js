import React, { Component } from "react";
import luutru from "./luutru.json";
import NewsHeader from "../NewsHeader/NewsHeader";
import Xuattintuc from "./Xuattintuc";
import { Container } from "reactstrap";
import ContentNewsLeft from "../Newscontent/ContentNewsLeft";

class TinTucKho extends Component {
  render() {
    return tinLuuTru(luutru);
  }
}
const tinLuuTru = (luutru) => {
  return (
    <div>
      <NewsHeader />
      <div className="container-body">
        <ContentNewsLeft />
        <div className="body-right-box tintuckho">
          <h5>Tin lữu trữ</h5>
          <div className="newsUnique-container">
            {luutru.map((val, index) => {
              return (
                <Xuattintuc
                  imgdautrang={val.imgdautrang}
                  key={val.id}
                  id={val.id}
                  tieuDe={val.tieuDe}
                  content={val.content}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TinTucKho;
