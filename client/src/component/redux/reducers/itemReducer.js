import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UDATE_ITEM,
} from "./../actions/types";

const initiaState = {
  News: [],
  loading: false,
};

export default function (state = initiaState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        News: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        News: state.News.filter((item) => item._id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        News: [action.payload, ...state.News],
      };
    case UDATE_ITEM:
      return {
        ...state,

        News: [action.payload, ...state.News],
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
