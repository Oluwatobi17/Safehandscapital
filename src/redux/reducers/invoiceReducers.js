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

export const invoiceListReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_INVOICE_LIST_REQUEST:
      return { loadingInvoice: true };
    case GET_INVOICE_LIST_SUCCESS:
      return { loadingInvoice: false, invoice_list: action.payload };
    case GET_INVOICE_LIST_FAILURE:
      return { loadingInvoice: false, error: action.payload };

    default:
      return state;
  }
};

export const singleInvoiceReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_INVOICE_REQUEST:
      return { loadingInvoices: true };
    case GET_SINGLE_INVOICE_SUCCESS:
      return { loadingInvoices: false, single_invoice: action.payload };
    case GET_SINGLE_INVOICE_FAILURE:
      return { loadingInvoices: false, error: action.payload };

    default:
      return state;
  }
};
export const makePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_REQUEST:
      return { loadingPayment: true };
    case MAKE_PAYMENT_SUCCESS:
      return { loadingPayment: false, deposit: action.payload };
    case MAKE_PAYMENT_FAILURE:
      return { loadingPayment: false, error: action.payload };

    default:
      return state;
  }
};
export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_REQUEST:
      return { loadingCoupon: true };
    case COUPON_SUCCESS:
      return { loadingCoupon: false, coupon: action.payload };
    case COUPON_FAILURE:
      return { loadingCoupon: false, error: action.payload };

    default:
      return state;
  }
};
