import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./forAdmin/errorReducer";
import authReducer from "./forAdmin/authReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});
