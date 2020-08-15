import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import luutru from "./luutru.json";

class Xuattintuc extends Component {
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
      luutru: luutru,
    };
  }
  luutru = () => {
    const prop = this.props;
    const luutrutin = {
      id: prop.id,
      imgdautrang: prop.imgdautrang,
      tieuDe: prop.tieuDe,
      content: prop.content,
    };
    this.state.luutru.push(luutrutin);
    this.setState({
      luutru: this.state.luutru,
    });

    alert("Đã thêm vào kho");
  };
  render() {
    return (
      <div>
        <div className="news-box">
          <div className="news-box_wrap">
            <div className="nb_img">
              <img alt="" src={this.props.imgdautrang} />
            </div>
            <div className="nb_content">
              <h5>{this.props.tieuDe}</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.content.slice(0, 130) + "...",
                }}
              ></div>
            </div>
            <div className="nb-nav-wrap">
              <div className="nb-nav">
                <ul className="nb-nav_list">
                  <li>
                    <ModalExample
                      tieuDe={this.props.tieuDe}
                      content={this.props.content}
                    />
                  </li>
                  <li>
                    <Link
                      to={
                        "chitiettin/" +
                        this.props.id +
                        "/" +
                        this.to_slug(String(this.props.tieuDe))
                      }
                    >
                      <i className="far fa-newspaper"></i>
                    </Link>
                  </li>

                  <li>
                    <p onClick={this.luutru}>
                      <i className="fas fa-database"></i>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ModalExample = (props) => {
  const { buttonLabel, className, tieuDe, content } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <p onClick={toggle}>
        <i className="far fa-eye"></i>
      </p>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{tieuDe}</ModalHeader>
        <ModalBody>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            <i className="fas fa-times"></i>&nbsp; đóng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Xuattintuc;
