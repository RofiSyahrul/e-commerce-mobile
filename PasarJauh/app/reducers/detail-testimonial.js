import {
  LOAD_DETAIL,
  ADD_DATA_FAILURE,
  LIKE_ITEM,
  LIKE_ITEM_SUCCESS,
  LIKE_ITEM_FAILURE,
  BUY_ITEM,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAILURE,
  LOAD_TESTIMONIALS,
  ADD_TESTIMONIALS,
  ADD_TESTIMONIALS_SUCCESS,
  ADD_TESTIMONIALS_FAILURE
} from "../constants/actionTypes";

export default function detailTestimonial(
  state = { detail: {}, testimonials: [] },
  action
) {
  let { type, itemLoaded, itemId, vote, stock, rate, testimonials } = action;
  let newDetail;
  switch (type) {
    case LOAD_DETAIL:
      return { ...state, detail: itemLoaded, sent: true };

    case LIKE_ITEM:
    case LIKE_ITEM_SUCCESS:
      newDetail = {
        ...state.detail,
        ...(state.detail.itemId === itemId && { vote })
      };
      localStorage.setItem("itemLoaded", JSON.stringify(newDetail));
      return {
        ...state,
        detail: newDetail,
        ...(state.detail.itemId === itemId && { sent: true })
      };

    case BUY_ITEM:
    case BUY_ITEM_SUCCESS:
      newDetail = {
        ...state.detail,
        ...(state.detail.itemId === itemId && { stock })
      };
      localStorage.setItem("itemLoaded", JSON.stringify(newDetail));
      return {
        ...state,
        detail: newDetail,
        ...(state.detail.itemId === itemId && { sent: true })
      };

    case LOAD_TESTIMONIALS:
      return { ...state, testimonials, sent: true };

    case ADD_TESTIMONIALS:
    case ADD_TESTIMONIALS_SUCCESS:
      newDetail = {
        ...state.detail,
        ...(state.detail.itemId === itemId && { rate, testimonials })
      };
      localStorage.setItem("itemLoaded", JSON.stringify(newDetail));
      return {
        ...state,
        detail: newDetail,
        ...(state.detail.itemId === itemId && { testimonials }),
        ...(state.detail.itemId === itemId && { sent: true })
      };

    case ADD_DATA_FAILURE:
    case LIKE_ITEM_FAILURE:
    case BUY_ITEM_FAILURE:
    case ADD_TESTIMONIALS_FAILURE:
      return {
        ...state,
        ...(state.detail.itemId === itemId && { sent: false })
      };

    default:
      return state;
  }
}
