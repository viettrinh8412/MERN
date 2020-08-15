import React, { Component } from "react";
import PopularReviews from "./PopularReviews";
import BestDeals from "./BestDeals";
import Xuattintuc from "../../newsCollection/Xuattintuc";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../redux/actions/itemActions";
import { Link } from "react-router-dom";

class ContentNewsRight extends Component {
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
    const { News } = this.props.item;
    return (
      <div className="body-right-box">
        <div className="brb-popular-reviews">
          <PopularReviews />
          <div className="best-deals">
            <div className="popular-reviews-header">
              <h4>Giáo dục</h4>

              <Link to="/giao-duc" className="span_hover_move">
                <span>
                  Xem tất cả
                  <i className="fas fa-long-arrow-alt-right" />
                </span>
              </Link>
            </div>

            <div className="best-deals-box">
              {/* kết thúc 1 khối */}
              <div className="newsUnique-container">
                {News.filter((val) => {
                  return val.loaiTin === "gd";
                })
                  .slice(0, 3)
                  .map((val, index) => {
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

              <div className="clear" />
              {/* kết thúc best-deals */}

              <div className="popular-reviews-header">
                <h4>Thể thao</h4>

                <Link to="/the-thao" className="span_hover_move">
                  <span>
                    Xem tất cả
                    <i className="fas fa-long-arrow-alt-right" />
                  </span>
                </Link>
              </div>

              <div className="newsUnique-container">
                {News.filter((val) => {
                  return val.loaiTin === "tt";
                })
                  .slice(0, 3)
                  .map((val, index) => {
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

              <div className="clear" />
              {/* bắt đầu advertisement */}

              {/* kết thúc advertisement */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContentNewsRight.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems })(ContentNewsRight);
