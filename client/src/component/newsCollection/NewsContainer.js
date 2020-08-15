import React, { Component, useState } from "react";
import NewsHeader from "../NewsHeader/NewsHeader";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { getItems } from "../redux/actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import luutru from "./luutru.json";
import Xuattintuc from "./Xuattintuc";
import ContentNewsLeft from "../Newscontent/ContentNewsLeft";

class NewsContainer extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  constructor(props) {
    super(props);
    this.state = {
      luutru: luutru,
      title: "",
      content: "",
    };
  }

  render() {
    const images = [
      "giaitri1.png",
      "giaitri2.jpg",
      "giaitri3.jpg",
      "giaitri4.jpg",
      "dulich1.jpg",
      "dulich2.jpg",
      "dulich3.jpg",
      "dulich4.jpg",
      "thethao1.jpg",
      "thethao2.jpg",
      "thethao3.jpg",
      "thethao4.jpg",
      "giaoduc1.jpg",
      "giaoduc2.jpg",
      "giaoduc3.jpg",
      "giaoduc4.jpg",
      "chinhtri1.jpg",
      "chinhtri2.jpg",
      "chinhtri3.jpg",
      "chinhtri4.jpg",
    ];
    const { News } = this.props.item;
    console.log(luutru);
    return (
      <div>
        <NewsHeader />
        <div className="container-body">
          <ContentNewsLeft />

          <div className="body-right-box tintuckho">
            <h5>Tin mới</h5>

            <div className="newsUnique-container">
              {News.map((val, index) => {
                return (
                  <Xuattintuc
                    imgdautrang={val.duongdanhinhanh}
                    key={val._id}
                    id={val._id}
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
  }
}

NewsContainer.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems })(NewsContainer);
