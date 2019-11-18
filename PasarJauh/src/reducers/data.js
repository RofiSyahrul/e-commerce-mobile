import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  FILTER_DATA_SUCCESS,
  FILTER_DATA_FAILURE,
  ADD_DATA
} from "../constants/actionTypes";

const defaultSortBy = [
  { field: "rate", asc: false },
  { field: "price", asc: true },
  { field: "vote", asc: false }
];

export default function data(
  state = {
    items: [],
    pagination: { numOfPages: 1, limit: 4, page: 1 },
    sortBy: defaultSortBy
  },
  action
) {
  let { type, items, pagination, sortBy, item } = action;
  switch (type) {
    case LOAD_DATA_SUCCESS:
    case FILTER_DATA_SUCCESS:
      let newItems = pagination.page > 1 ? [...state.items, ...items] : items;
      return {
        items: newItems.map(item => ({ ...item, sent: true })),
        pagination,
        sortBy
      };

    case ADD_DATA:
      return {
        ...state,
        items: [...state.items, { ...item, sent: true }]
      };

    case LOAD_DATA_FAILURE:
    case FILTER_DATA_FAILURE:
    default:
      return state;
  }
}
