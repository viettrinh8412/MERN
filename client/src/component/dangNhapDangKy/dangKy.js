import React, { Component } from "react";
import { ButtonToggle, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import NewsHeader from "../NewsHeader/NewsHeader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorActions";

class dangKy extends Component {
  state = {
    modal: false,
    username: "",
    email: "",
    password: "",
    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // if (isAuthenticated) {
    //   this.props.clearErrors();
    // }
  }

  onSubmit1 = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    //Create user object
    const newUser = {
      username,
      email,
      password,
    };

    // Attempt to register
    this.props.register(newUser);
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

        <div className="dangnhap-container">
          <Form style={{ textAlign: "left" }} onSubmit={this.onSubmit1}>
            <FormGroup>
              <Label for="dkusername">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                onChange={(e) => this.onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dkemail">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e) => this.onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dkpassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={(e) => this.onChange(e)}
                placeholder="password"
              />
            </FormGroup>
            <ButtonToggle type="submit" color="primary">
              Đăng ký
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

export default connect(mapStateToProps, { register, clearErrors })(dangKy);
