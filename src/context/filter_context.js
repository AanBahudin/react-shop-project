import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products : [],
  all_products : [],
  grid: false,
  sort: 'price-lowest',
  categories : {
    text: '',
    color: 'all',
    company: 'all',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }

}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState)


  const changeLayout = (status) => {
    if(status === true) {
      dispatch({type: SET_LISTVIEW})
    } else{
      dispatch({type: SET_GRIDVIEW})
    }
  }

  const updateSort = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch({type: UPDATE_SORT, payload: value, name})
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    if(name === 'category') {
      value = e.target.textContent;
    }

    if(name === 'color') {
      value = e.target.dataset.color
    }

    if(name === 'price') {
      value = Number(value)
    }

    if(name === 'shipping') {
      value = e.target.checked
    }
    dispatch({type: UPDATE_FILTERS, payload: {value, name}})
  }

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products})
  }, [products])

  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  }, [products, state.sort, state.categories])

  return (
    <FilterContext.Provider value={{
      ...state,
      changeLayout,
      updateSort,
      updateFilters,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
