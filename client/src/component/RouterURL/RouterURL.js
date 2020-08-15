import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";

import DetailNews from "../Newscontent/ContentNewsRight/DetailNews";
import dangNhap from "../dangNhapDangKy/dangNhap";
import dangKy from "../dangNhapDangKy/dangKy";
import AdminContainer from "../admin/AdminContainer";
import AdminEditBox from "../admin/adminRight/AdminEditBox";
import NewsContainer from "../newsCollection/NewsContainer";
import TinTucKho from "../newsCollection/TinTucKho";
import VanHoaChinhTri from "../newsCollection/VanHoaChinhTri";
import GiaiTri from "../newsCollection/GiaiTri";
import TheThao from "../newsCollection/TheThao";
import GiaoDuc from "../newsCollection/GiaoDuc";
import DuLich from "../newsCollection/DuLich";

class RouterURL extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route exact path="/chitiettin/:id/:slug" component={DetailNews} />
          <Route exact path="/api/items/update/:id" component={AdminEditBox} />
          <Route exact path="/khotintuc" component={TinTucKho} />
          <Route exact path="/" component={Home} />
          <Route exact path="/the-thao" component={TheThao} />
          <Route exact path="/giao-duc" component={GiaoDuc} />
          <Route exact path="/du-lich" component={DuLich} />
          <Route exact path="/van-hoa-chinh-tri" component={VanHoaChinhTri} />
          <Route exact path="/giai-tri" component={GiaiTri} />
          <Route exact path="/tin-moi" component={NewsContainer} />
          <Route exact path="/dangnhap" component={dangNhap} />
          <Route exact path="/dangky" component={dangKy} />
          <Route exact path="/admin" component={AdminContainer} />
          <Route exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default RouterURL;
