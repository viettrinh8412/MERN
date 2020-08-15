import React, { Component } from "react";
import { getItems } from "../redux/actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewsHeader from "../NewsHeader/NewsHeader";
import { Container } from "reactstrap";
import Xuattintuc from "./Xuattintuc";
import ContentNewsLeft from "../Newscontent/ContentNewsLeft";

class GiaoDuc extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  to_slug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  };

  render() {
    const images = [
      "giaoduc1.jpg",
      "giaoduc2.jpg",
      "giaoduc3.jpg",
      "giaoduc4.jpg",
    ];
    const { News } = this.props.item;
    return (
      <div>
        <NewsHeader />
        <div className="container-body">
          <ContentNewsLeft />

          <div className="body-right-box tintuckho">
            <h5>Tin giáo dục</h5>

            <div className="newsUnique-container">
              {News.filter((val) => {
                return val.loaiTin === "gd";
              }).map((val, index) => {
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

GiaoDuc.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems })(GiaoDuc);
