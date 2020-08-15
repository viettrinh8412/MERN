import React, { Component } from "react";
import NewsHeader from "./NewsHeader/NewsHeader";
import NewsContent from "./Newscontent/NewsContent";

// import logo from './logo.svg';
// import SingleProduct from "../Tab_products/Tab_child/SingleProduct";
//import Tab_products from '../Tab_products/Tab_products';

class Home extends Component {
  render() {
    return (
      <div>
        <NewsHeader />
        <NewsContent />
        <div className="clear" />
      </div>
    );
  }
}

export default Home;
