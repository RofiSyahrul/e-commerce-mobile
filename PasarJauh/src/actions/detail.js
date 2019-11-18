import { request } from "../helpers/accessAPI";
import {
  LOAD_DETAIL,
  LIKE_ITEM,
  LIKE_ITEM_SUCCESS,
  LIKE_ITEM_FAILURE,
  BUY_ITEM,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAILURE
} from "../constants/actionTypes";

// LOAD ITEM DETAIL
const loadDetailRedux = itemLoaded => ({
  type: LOAD_DETAIL,
  itemLoaded
});

export const loadDetail = itemId => {
  return (dispatch, getState) => {
    let { data } = getState();
    let itemLoaded = JSON.parse(localStorage.getItem("itemLoaded") || "{}");
    if (itemLoaded === {} || itemLoaded.itemId !== itemId) {
      let { items } = data;
      if (itemId) localStorage.setItem("itemId", itemId);
      else itemId = Number(localStorage.getItem("itemId"));

      if (Object.values(items).length === 0)
        items = JSON.parse(localStorage.getItem("data")).items;

      itemLoaded = [...items].filter(item => item.itemId === itemId);
      itemLoaded = itemLoaded[0] || {};
      localStorage.setItem("itemLoaded", JSON.stringify(itemLoaded));
    }
    dispatch(loadDetailRedux(itemLoaded));
  };
};

// LIKE ITEM
const likeItemRedux = ({ itemId, vote }) => ({ type: LIKE_ITEM, itemId, vote });

const likeItemSuccess = ({ itemId, vote }) => ({
  type: LIKE_ITEM_SUCCESS,
  itemId,
  vote
});

const likeItemFailure = itemId => ({ type: LIKE_ITEM_FAILURE, itemId });

export const likeItem = (liked = { itemId: 0, vote: 0 }) => {
  // vote is already calculated at container
  let { itemId, vote } = liked;
  return dispatch => {
    dispatch(likeItemRedux(liked));
    return request
      .put(itemId.toString(), { vote })
      .then(result => {
        let response = result.data;
        if (response.error) dispatch(likeItemFailure(itemId));
        else dispatch(likeItemSuccess(response));
      })
      .catch(() => dispatch(likeItemFailure(itemId)));
  };
};

// BUY ITEM
const buyItemRedux = ({ itemId, stock }) => ({ type: BUY_ITEM, itemId, stock });

const buyItemSuccess = ({ itemId, stock }) => ({
  type: BUY_ITEM_SUCCESS,
  itemId,
  stock
});

const buyItemFailure = itemId => ({ type: BUY_ITEM_FAILURE, itemId });

export const buyItem = (bought = { itemId: 0, stock: 0 }) => {
  // stock is already calculated at container
  let { itemId, stock } = bought;
  return dispatch => {
    dispatch(buyItemRedux(bought));
    console.log(bought);

    return request
      .put(itemId.toString(), { stock })
      .then(result => {
        let response = result.data;
        console.log({ response });

        if (response.error) dispatch(buyItemFailure(itemId));
        else dispatch(buyItemSuccess(response));
      })
      .catch(() => dispatch(buyItemFailure(itemId)));
  };
};
