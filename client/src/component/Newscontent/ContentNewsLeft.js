import React, { Component } from "react";
import { Link } from "react-router-dom";

class ContentNewsLeft extends Component {
  render() {
    return (
      <div className="body-left-box">
        <div className="body-left-box-wrap">
          <div className="categories-contain">
            <h5>Danh mục tin tức</h5>
            <ul className="list-categories">
              <li>
                <Link to="/tin-moi">Tin mới</Link>
              </li>
              <li>
                <Link to="/van-hoa-chinh-tri">Văn hóa &amp; Chính trị</Link>
              </li>
              <li>
                <Link to="/giao-duc">Giáo dục</Link>
              </li>
              <li>
                <Link to="/the-thao">Thể thao</Link>
              </li>
              <li>
                <Link to="/du-lich">Du lịch</Link>
              </li>
              <li>
                <Link to="/giai-tri">Giải trí</Link>
              </li>
            </ul>
          </div>
          {/* <div className="newsletter-left-box">
            <h5>Nhận thông báo</h5>
            <p>
              Nhận thông báo khi các tin tức mới được cập nhập. Đăng ký để theo
              dõi tin tức mới nhất mỗi ngày.
            </p>
            <input type="email" name="email" placeholder="Nhập email của bạn" />
            <button className="submit-email">Theo dõi</button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ContentNewsLeft;
