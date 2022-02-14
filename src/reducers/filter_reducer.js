import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if(action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice);

    return {...state, all_products: [...action.payload], filtered_products:[...action.payload], categories: {...state.categories, max_price: maxPrice, price: maxPrice}}
  } if(action.type === SET_GRIDVIEW) {
    return {...state, grid: false}
  } if(action.type === SET_LISTVIEW) {
    return {...state, grid: true}
  } if (action.type === UPDATE_SORT) {
    return {...state, sort: action.payload}
  } if (action.type === SORT_PRODUCTS) {

    const {sort, filtered_products} = state;
    let tempState = [...filtered_products];

    if(sort === 'price-lowest') {
      tempState = tempState.sort((a, b) => a.price - b.price);
    } if (sort === 'price-highest') {
      tempState = tempState.sort((a, b) => b.price - a.price);
    } if (sort === 'name-a') {
      tempState = tempState.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    } if (sort === 'name-z') {
      tempState = tempState.sort((a, b) => {
        return b.name.localeCompare(a.name);
      })
    }
    return {...state, filtered_products: tempState}
  } if (action.type === UPDATE_FILTERS) {

    const {value, name} = action.payload

    return {...state, categories: {...state.categories, [name]: value}}
  } if (action.type === FILTER_PRODUCTS) {
      const {all_products} = state;
      const {text, color, company, category, price, shipping} = state.categories;
      let tempProducts = [...all_products];

      if(text) {
        tempProducts = tempProducts.filter((products) => {
          return products.name.toLowerCase().startsWith(text)
        })
      }

      if(category !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category
        })
      }

      if(company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company
        })
      }

      if(color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((newColor) => newColor === color)
        })
        
      }

      if(price) {
        tempProducts = tempProducts.filter((product) => {
          return product.price <= price
        })  
      }

      if(shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true
        })
      }
      

      return {...state, filtered_products : tempProducts}
  } if(action.type === CLEAR_FILTERS) {
    return {...state, categories : {
      ...state.categories,
      text: '',
      color: 'all',
      company: 'all',
      category: 'all',
      price: state.categories.max_price,
      shipping: false
    }}
  }


  return state
  // eslint-disable-next-line
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
