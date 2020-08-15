import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterURL from "../component/RouterURL/RouterURL";
import { Provider } from "react-redux";
import store from "../component/redux/store";
import { loadUser } from "../component/redux/actions/authActions";


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <RouterURL />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
