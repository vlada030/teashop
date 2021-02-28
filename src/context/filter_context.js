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
  filteredProducts: [],
  allProducts: [],
  gridView: false,
  sort: 'price-lowest',
  filter: {
    text: '',
    category: 'svi',
    illness: 'svi',
    unit: 'svi',
    minPrice: 0,
    maxPrice: 0,
    price: 0
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

const [state, dispatch] = useReducer(reducer, initialState);
const {products} = useProductsContext();

useEffect(() => {
  dispatch({type: LOAD_PRODUCTS, payload: products})
}, [products]);

useEffect(() => {
  dispatch({type: FILTER_PRODUCTS});
  dispatch({type: SORT_PRODUCTS});
}, [products, state.sort, state.filter]);

const setGridView = () => {
  dispatch({type: SET_GRIDVIEW})
};

const setListView = () => {
  dispatch({type: SET_LISTVIEW})
};

const updateSort = (e) => {
  const value = e.target.value;
  dispatch({type: UPDATE_SORT, payload: value});
}

const updateFilters = (e) => {
  const name = e.target.name;
  let value = e.target.value;

  if (name === 'category' || name === 'unit') {
    value = e.target.innerText;
  }

  if (name === 'price') {
    value = Number(value);
  }
  // console.log({name, value});
  dispatch({type: UPDATE_FILTERS, payload: {name, value}})
}

const clearFilters = () => {
  dispatch({type: CLEAR_FILTERS, payload: {...initialState.filter}})
}

  return (
      <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
          {children}
      </FilterContext.Provider>
  );
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
