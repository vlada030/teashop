  import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {goToPagesTop} from '../utils/helpers';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  SHOW_PAGE,
  NEXT_PAGE,
  PREV_PAGE
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
  },
  page: 0,
  paginatedProducts: [], 
};

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
}, [products, state.sort, state.filter, state.page]);

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

const showPage = (index) => {
  dispatch({type: SHOW_PAGE, payload: index});
  goToPagesTop();
}

const nextPage = () => {
  dispatch({type: NEXT_PAGE});
  goToPagesTop();
}

const prevPage = () => {
  dispatch({type: PREV_PAGE});
  goToPagesTop();
}

  return (
      <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters, nextPage, prevPage, showPage}}>
          {children}
      </FilterContext.Provider>
  );
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
