import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Logout from "../dangNhapDangKy/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import luutru from "../newsCollection/luutru.json";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
class NewsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTinLuuTru: false,
    };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  // opentinluutru = () => {
  //   this.setState({
  //     openTinLuuTru: !this.state.openTinLuuTru,
  //   });
  //   if (this.state.openTinLuuTru) {
  //     console.log(this.state.openTinLuuTru);
  //     return tinLuuTru();
  //   }
  // };
 
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li>
          <p style={{ color: "#fff" }}>
            <strong>{user ? `Welcome ${user.username}` : ""}</strong>
          </p>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Logout />
        </li>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <li>
          <Link to="/dangnhap">Đăng Nhập</Link>
        </li>

        <li>
          <Link to="/dangky">Đăng ký</Link>
        </li>
      </Fragment>
    );

    return (
      <div className="header">
        <div className="header-container">
          <div className="nav-container">
            <div className="nav_container">
              <div className="icon-header">
                <i
                  className="far fa-newspaper"
                  style={{ fontSize: "48px", color: "#fff" }}
                ></i>
                <div className="nav-content">
                  <nav>
                    <ul>
                      <li>
                        <Link to="/">Trang chủ</Link>
                      </li>
                      <li>
                        <Link to="/khotintuc">
                          <i className="fas fa-database"></i>&nbsp; Tin lưu trữ
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="find-news">
                {isAuthenticated ? authLinks : guestLinks}
                <button></button>
              </div>
            </div>
          </div>
        </div>

        <div className="advertisement">
        <Slider {...settings}>
          <div className="slideForHead">
           
          </div>
          <div className="slideForHead-1">
           
          </div>
          <div className="slideForHead-2">
           
          </div>
      
        </Slider>
          {/* <div className="advertisement-wrap">
            <div className="advertisement-contain">
              <h4>
                <a href="google.com">Cách ly toàn xã hội</a>
              </h4>
              <p>
                Không có chiếc "đũa thần" nào thay thế sự đồng tâm, hiệp lực của
                các tầng lớp nhân dân ta sát cánh cùng Đảng, Nhà nước trong cuộc
                chiến đẩy lùi đại dịch. Hơn bao giờ hết, lòng yêu nước, tính
                năng động, sáng tạo, trí tuệ và bản lĩnh của con cháu Lạc Hồng
                cần được phát huy cao nhất trong thời kỳ đầy cam go, thử thách
                này, nhưng sẽ mở ra tiền đồ tươi sáng của dân tộc Việt Nam ta!
              </p>
            </div>
          </div> */}
        </div>
       
    
    
    
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(NewsHeader);
