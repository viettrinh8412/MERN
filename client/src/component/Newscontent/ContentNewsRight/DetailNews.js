import React, { Component } from "react";
import NewsHeader from "../../NewsHeader/NewsHeader";
import ContentNewsLeft from "../ContentNewsLeft";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../redux/actions/itemActions";

class DetailNews extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    const { News } = this.props.item;
    const id = this.props.match.params.id;
    // console.log(typeof id);
    return (
      <div>
        <NewsHeader />
        <div className="container-body">
          <ContentNewsLeft />
          <div className="body-right-box">
            {News.map((val, key) => {
              if (val._id === id) {
                return (
                  <div key={val._id}>
                    {/* <img alt="" src="/template/images/29-2-696x463.jpg" /> */}
                    <h2>{val.tieuDe}</h2>
                    <p dangerouslySetInnerHTML={{ __html: val.content }}></p>
                    <img alt="" src={val.duongdanhinhanh} />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}
DetailNews.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(DetailNews);
