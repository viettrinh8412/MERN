import React, { Component } from "react";
import {
  ButtonToggle,
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  Button,
  Alert,
} from "reactstrap";
import CKEditor from "ckeditor4-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateItems } from "../../redux/actions/itemActions";
import PropTypes from "prop-types";

class AdminEditBox extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      duongdanhinhanh: props.duongdanhinhanh,
      loaiTin: props.valueLoaiTin,
      tieuDe: props.contentname,
      content: props.CKEdata,
      alert: false,
    };
  }

  toggleEditNews = (id, val) => {
    this.setState({
      editing: !this.state.editing,
    });
  };
  saveDataCTKEditor = (e) => {
    this.setState({
      content: e.editor.getData(),
    });
  };
  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  onSubmitEditTin = (e) => {
    e.preventDefault();
    const item = {
      duongdanhinhanh: this.state.duongdanhinhanh,
      loaiTin: this.state.loaiTin,
      tieuDe: this.state.tieuDe,
      content: this.state.content,
    };

    this.props.updateItems(item, this.props.idForEdit);
    console.log(this.state.alert);
  };

  showFormEdit = () => {
    if (this.state.editing === false) {
      return null;
    } else {
      return (
        <div className="panel-editNews ">


          <Form
            style={{ textAlign: "left" }}
            onSubmit={this.onSubmitEditTin}
            name="editTinTuc"
          >
            <FormGroup>
              <Label>Nhập tên đường dẫn hình ảnh</Label>
              <br />
              <span>
                &nbsp;&nbsp;&nbsp;VD: /template/images/anh_dau_tin/new1.jpg
                (new2.jpg, new3.jpg)
              </span>
              <div className="space" />
              <Input
                defaultValue={this.props.duongdanhinhanh}
                placeholder={this.props.duongdanhinhanh}
                type="text"
                name="duongdanhinhanh"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nhập tên tin tức</Label>
              <Input
                type="text"
                name="tieuDe"
                defaultValue={this.props.contentname}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Nhập thể loại tin tức</Label>

              
              <Input
                type="select"
                name="loaiTin"
                id="exampleSelect"
                defaultValue={this.props.valueLoaiTin}
                onChange={this.handleInputChange}
              >
                <option value="vhct">Văn hóa & Chính trị</option>
                <option value="gd">Giáo dục</option>
                <option value="tt">Thể thao</option>
                <option value="dl">Du lịch</option>
                <option value="gt">Giai trí</option>
              </Input>
              
            </FormGroup>
            <FormGroup>
              <Label>Nhập nội dung tin tức:</Label>
              <CKEditor
                data={this.props.CKEdata}
                name="content"
                onChange={this.saveDataCTKEditor}
              />
            </FormGroup>

            <ButtonToggle
              style={{ color: "#fff" }}
              type="submit"
              color="warning"
              onClick={() => alert("Đã chỉnh sửa tin tức")}
            >
              <i className="far fa-edit"></i>&nbsp; Edit
            </ButtonToggle>
          </Form>
       
       
       
       </div>
      );
    }
  };
  render() {
    return (
      <div>
        <Button
          className="editNews accordion"
          color="success"
          onClick={this.toggleEditNews}
        >
          <i className="far fa-edit"></i>&nbsp; Edit
        </Button>

        {this.showFormEdit()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { updateItems })(AdminEditBox);
