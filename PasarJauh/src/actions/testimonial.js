import { request } from "../helpers/accessAPI";
import { mean } from "../helpers/mean";
import {
  LOAD_TESTIMONIALS,
  ADD_TESTIMONIALS,
  ADD_TESTIMONIALS_SUCCESS,
  ADD_TESTIMONIALS_FAILURE
} from "../constants/actionTypes";

// LOAD
const loadTestimonialsRedux = testimonials => ({
  type: LOAD_TESTIMONIALS,
  testimonials
});

export const loadTestimonials = itemId => {
  return (dispatch, getState) => {
    let { data } = getState();
    let itemLoaded, testimonials;
    itemLoaded = JSON.parse(localStorage.getItem("itemLoaded") || "{}");
    if (itemLoaded === {} || itemLoaded.itemId !== itemId) {
      let { items } = data;
      if (itemId) localStorage.setItem("itemId", itemId);
      else itemId = Number(localStorage.getItem("itemId"));

      if (Object.values(items).length === 0)
        items = JSON.parse(localStorage.getItem("data")).items;

      itemLoaded = [...items].filter(item => item.itemId === itemId)[0] || {};
      testimonials = itemLoaded.testimonials || [];
      localStorage.setItem("itemLoaded", JSON.stringify(itemLoaded));
    } else {
      testimonials = itemLoaded.testimonials;
    }
    dispatch(loadTestimonialsRedux(testimonials));
  };
};

// ADD
const addTestimonialsRedux = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS,
  itemId,
  rate,
  testimonials
});

const addTestimonialSuccess = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS_SUCCESS,
  itemId,
  rate,
  testimonials
});

const addTestimonialFailure = ({ itemId, rate, testimonials }) => ({
  type: ADD_TESTIMONIALS_FAILURE,
  itemId,
  rate,
  testimonials
});

export const addTestimonial = (rated = { itemId: 0, testimonials: [] }) => {
  // testimonials have been updated in container
  let { itemId, testimonials } = rated;
  return dispatch => {
    let rates = testimonials.map(testi => testi.rate);
    let rate = mean(rates);
    dispatch(addTestimonialsRedux({ itemId, rate, testimonials }));
    return request
      .put(itemId.toString(), {
        rate,
        testimonials: JSON.stringify(testimonials)
      })
      .then(result => {
        let response = result.data;
        if (response.error)
          dispatch(addTestimonialFailure({ itemId, rate, testimonials }));
        else dispatch(addTestimonialSuccess({ itemId, rate, testimonials }));
      })
      .catch(() =>
        dispatch(addTestimonialFailure({ itemId, rate, testimonials }))
      );
  };
};
