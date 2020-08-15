import React, { Component } from "react";
import NewsHeader from "../NewsHeader/NewsHeader";
import AdminRight from "./adminRight/AdminEditNews";

class AdminContainer extends Component {
  render() {
    return (
      <div className="admin-container">
        <NewsHeader />
        <AdminRight />
      </div>
    );
  }
}

export default AdminContainer;
