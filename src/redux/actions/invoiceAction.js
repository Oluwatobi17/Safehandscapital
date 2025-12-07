import {
  GET_INVOICE_LIST_REQUEST,
  GET_INVOICE_LIST_SUCCESS,
  GET_INVOICE_LIST_FAILURE,
  GET_SINGLE_INVOICE_REQUEST,
  GET_SINGLE_INVOICE_SUCCESS,
  GET_SINGLE_INVOICE_FAILURE,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAILURE,
  COUPON_REQUEST,
  COUPON_SUCCESS,
  COUPON_FAILURE,
} from "../constants/invoiceConstants";
import axios from "axios";

export const handleGetInvoiceList = (user_id, token) => (dispatch) => {
  dispatch({ type: GET_INVOICE_LIST_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_invoice_list&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: GET_INVOICE_LIST_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_INVOICE_LIST_FAILURE,
        payload: error.message,
      });
    });
};
export const makePayment =
  (user_id, invoice_id, amount, token, setIsOpen, isOpen) => (dispatch) => {
    dispatch({ type: MAKE_PAYMENT_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=make_payment&user_id=${user_id}&invoice_id=${invoice_id}&amount=${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: MAKE_PAYMENT_SUCCESS,
          payload: response.data.data,
        });
        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: MAKE_PAYMENT_FAILURE,
          payload: error.message,
        });
      });
  };
export const handleGetSingleInvoice =
  (user_id, token, invoice_id) => (dispatch) => {
    dispatch({ type: GET_SINGLE_INVOICE_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=get_single_invoice&user_id=${user_id}&invoice_id=${invoice_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_SINGLE_INVOICE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SINGLE_INVOICE_FAILURE,
          payload: error.message,
        });
      });
  };
export const handleCoupon =
  (user_id, token, invoice_id, coupon, amount, toast) => (dispatch) => {
    dispatch({ type: COUPON_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=validate_coupon&user_id=${user_id}&invoice_id=${invoice_id}&coupon_code=${coupon}&amount=${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch({
          type: COUPON_SUCCESS,
          payload: response.data,
        });
        toast.success("Successful, Please Wait");
        setTimeout(() => {
          dispatch(handleGetSingleInvoice(user_id, token, invoice_id));
        }, 2000);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data
        );
        dispatch({
          type: COUPON_FAILURE,
          payload: error.message,
        });
      });
  };
