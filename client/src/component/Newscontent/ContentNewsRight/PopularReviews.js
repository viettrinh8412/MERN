import React, { Component } from "react";

import { Link } from "react-router-dom";
import { getItems } from "../../redux/actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PopularReviews extends Component {
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
    const images = [
      "giaitri1.png",
      "giaitri2.jpg",
      "giaitri3.jpg",
      "giaitri4.jpg",
      "dulich1.jpg",
      "dulich2.jpg",
      "dulich3.jpg",
    ];
    return (
      <div>
        <div className="popular-reviews-header">
          <h5>Tin mới cập nhập</h5>

          <Link to="/tin-moi" className="span_hover_move">
            <span>
              Xem tất cả
              <i className="fas fa-long-arrow-alt-right" />
            </span>
          </Link>
        </div>
        {News.slice(0, 7).map((val, index) => {
          return (
            <div className="latest_content" key={val._id}>
              <Link
                className="img-box"
                to={
                  "chitiettin/" +
                  val._id +
                  "/" +
                  this.to_slug(String(val.tieuDe))
                }
              >
                <img alt="" src={val.duongdanhinhanh} />
              </Link>
              <div className="popular-reviews-box-content">
                <div className="box-content-wrap">
                  <h6>
                    <Link
                      to={
                        "chitiettin/" +
                        val._id +
                        "/" +
                        this.to_slug(String(val.tieuDe))
                      }
                    >
                      {val.tieuDe}
                    </Link>
                  </h6>
                  <span>May 20, 2020</span>
                  <span>
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </span>

                  <p dangerouslySetInnerHTML={{ __html: val.content }}></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
PopularReviews.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems })(PopularReviews);
