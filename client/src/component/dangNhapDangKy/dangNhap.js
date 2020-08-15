import React, { Component } from "react";
import { ButtonToggle, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import NewsHeader from "../NewsHeader/NewsHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorActions";
import { LOGIN_FAIL } from "../redux/actions/types";

class dangNhap extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for login error
      if (error.id === LOGIN_FAIL) {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSubmit1 = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    //Attempt to login
    this.props.login(user);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <NewsHeader />
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        {this.props.isAuthenticated ? (
          <Alert color="success">Đăng nhập thành công</Alert>
        ) : null}
        <div className="dangnhap-container">
          <h2 style={{ textAlign: "center" }}></h2>
          <Form style={{ textAlign: "left" }} onSubmit={this.onSubmit1}>
            <FormGroup>
              <Label for="username">Email</Label>
              <Input
                type="text"
                name="email"
                id="username"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <label for="password">Password</label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
              />
            </FormGroup>
            <ButtonToggle type="submit" color="primary">
              Đăng nhập
            </ButtonToggle>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(dangNhap);
