import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  
  if(action.type === SIDEBAR_OPEN) {
    return {...state, isSidebarOpen: true}
  } if(action.type === SIDEBAR_CLOSE) {
  return {...state, isSidebarClose: true, isSidebarOpen: false}
  } 
  
  if (action.type === GET_PRODUCTS_BEGIN) {
    return {...state, products_loading : true}
  } if (action.type === GET_PRODUCTS_SUCCESS) {
    return {...state, products: action.payload, products_loading: false, featured_products: action.payload}
  } if(action.type === GET_PRODUCTS_ERROR) {
    return {...state, products_loading: false, products_error: true}
  } 
  
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {...state, single_product_loading: false, single_product_error : true}
  } if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {...state, single_product_loading : true, single_product_error: false}
  } if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {...state, single_product_loading: false, single_product:action.payload}
  } 
  else {
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  // eslint-disable-next-line
  return state
}

export default products_reducer
