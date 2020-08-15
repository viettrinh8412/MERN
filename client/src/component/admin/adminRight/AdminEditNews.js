import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import {
  ButtonToggle,
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  Button,
} from "reactstrap";

import { Link } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../../redux/actions/itemActions";
import PropTypes from "prop-types";
import AdminEditBox from "./AdminEditBox";

class AdminEditNews extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

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
  constructor(props) {
    super(props);

    this.state = {
      addNews: false,
      CTKdata: "",
      contentname: this.props.contentname,
      newsInfoAdd: {},
      loaiTin: "vhct",
      isOpen: false,
      nameNewsEdit: "",
      CTKdataEdit: "",
      selectedFile: null,
      showEditNews: false,
      duongdanhinhanh: "/template/images/anh_dau_tin/new1.jpg",
    };
  }

  submitFormAdd = (e) => {
    e.preventDefault();
    const newItem = {
      duongdanhinhanh: this.state.duongdanhinhanh,
      loaiTin: this.state.loaiTin,
      tieuDe: this.state.contentname,
      content: this.state.CTKdata,
    };
    // Add item via addItem action
    this.props.addItem(newItem);
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  saveDataCTKEditor = (e) => {
    this.setState({
      CTKdata: e.editor.getData(),
    });
  };
  saveDataCTKEditorNews = (e) => {
    this.setState({
      CTKdataEdit: e.editor.getData(),
    });
  };
  saveData = (evt) => {
    this.setState({
      contentname: evt.target.value,
    });
  };
  saveduongdanhinhanh = (evt) => {
    this.setState({
      duongdanhinhanh: evt.target.value,
    });
  };
  saveDataLoaiTin = (evt) => {
    this.setState({
      loaiTin: evt.target.value,
    });
  };

  addButtonTogle = () => {
    this.setState({
      addNews: !this.state.addNews,
    });
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  saveImgURL = (evt) => {
    this.setState({
      selectedFile: evt.target.files[0],
    });
    console.log(evt.target.files[0]);
  };
  showCKEditor = () => {
    if (this.state.addNews) {
      return (
        <Form
          style={{ textAlign: "left" }}
          onSubmit={(e) => {
            this.submitFormAdd(e);
          }}
        >
          <FormGroup>
            <Label>Nhập tên đường dẫn hình ảnh</Label>
            <br />
            <span>
              &nbsp;&nbsp;&nbsp;VD: /template/images/anh_dau_tin/new1.jpg
              (new2.jpg, new3.jpg)
            </span>
            <div class="space" />
            <Input
              value={this.state.duongdanhinhanh}
              type="text"
              defaultValue="/template/images/anh_dau_tin/new1.jpg"
              name="duongdanhinhanh"
              placeholder="/template/images/anh_dau_tin/new1.jpg"
              onChange={this.saveduongdanhinhanh}
            />
          </FormGroup>
          <FormGroup>
            <Label>Nhập tên tin tức</Label>
            <Input
              value={this.state.contentname}
              type="text"
              name="contentname"
              onChange={this.saveData}
            />
          </FormGroup>
          <FormGroup>
            <Label>Nhập thể loại tin tức</Label>

            {/* <Input
              value={this.state.loaiTin}
              type="text"
              name="loaiTin"
              onChange={this.saveDataLoaiTin}
            /> */}
            <Input
              type="select"
              name="loaiTin"
              id="exampleSelect"
              defaultValue="vhct"
              onChange={this.saveDataLoaiTin}
            >
              <option selected value="vhct">
                Văn hóa & Chính trị
              </option>
              <option value="gd">Giáo dục</option>
              <option value="tt">Thể thao</option>
              <option value="dl">Du lịch</option>
              <option value="gt">Giải trí</option>
            </Input>
            {/* <select
              name="loaiTin"
              value={this.state.loaiTin}
              onChange={this.saveDataLoaiTin}
            >
              <option selected value="vhct">
                Văn hóa & Chính trị
              </option>
              <option value="gd">Giáo dục</option>
              <option value="tt">Thể thao</option>
              <option value="dl">Du lịch</option>
              <option value="gt">Giai trí</option>
            </select> */}
          </FormGroup>
          <FormGroup>
            <Label>Nhập nội dung tin tức:</Label>
            <CKEditor
              data={this.state.CTKdata}
              name="content"
              onChange={this.saveDataCTKEditor}
            />
          </FormGroup>

          <ButtonToggle
            onClick={() => alert("Đã thêm sản phẩm")}
            style={{ color: "#fff" }}
            type="submit"
            color="warning"
          >
            <i className="fas fa-plus"></i>&nbsp; Add news
          </ButtonToggle>
        </Form>
      );
    }
  };
  // showEditNews = (id) => {
  //   console.log(this.state.showEditNews);
  //   if (this.state.showEditNews) {
  //     return (

  //     );
  //   }
  // };

  updateContentNews = (id) => {
    this.state.News.map((val, index) => {
      if (val.id === id) {
        val.tieuDe = this.state.contentname;
        val.content = this.state.CTKdataEdit;
      }
      return val;
    });
    this.setState({
      News: this.state.News,
    });
  };
  render() {
    const { News } = this.props.item;

    return (
      <Container
        name="themed-container"
        fluid="lg"
        className="adminEdit-container"
      >
        {this.props.isAuthenticated ? (
          <ButtonToggle
            className="addItems-btn"
            onClick={this.addButtonTogle}
            color="primary"
          >
            <i className="fas fa-plus"></i>&nbsp; Add new
          </ButtonToggle>
        ) : (
          <h4 className="mb-3 ml-4">đăng nhập trước khi sử dụng</h4>
        )}

        {this.showCKEditor()}
        {/* <ButtonToggle type="submit" onClick={this.onclick}>
          Click here
        </ButtonToggle> */}
        <TransitionGroup>
          {News.map((val, index) => {
            return (
              <CSSTransition timeout={500} classNames="fade" key={val._id}>
                <div className="latest_content" id={val._id + "lastContent"}>
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
                    {this.props.isAuthenticated ? (
                      <ButtonToggle
                        className="deleteNews"
                        color="danger"
                        onClick={this.onDeleteClick.bind(this, val._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </ButtonToggle>
                    ) : (
                      ""
                    )}

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
                      <span>September 20, 2018</span>
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

                  <AdminEditBox
                    duongdanhinhanh={val.duongdanhinhanh}
                    contentname={val.tieuDe}
                    onChange={this.saveDataCTKEditorNews}
                    CKEdata={val.content}
                    valueLoaiTin={val.loaiTin}
                    idForEdit={val._id}
                  />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Container>
    );
  }
}

AdminEditNews.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
  AdminEditNews
);
