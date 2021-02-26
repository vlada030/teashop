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
  switch (action.type) {
      case LOAD_PRODUCTS:
          // pronadji maximalnu vrednost za cenu
          let maxPrice = action.payload.map((product) => product.price);
          maxPrice = Math.max(...maxPrice);

          return {
              ...state,
              allProducts: [...action.payload],
              filteredProducts: [...action.payload],
              filter: { ...state.filter, maxPrice, price: maxPrice },
          };

      case SET_GRIDVIEW:
          return { ...state, gridView: true };

      case SET_LISTVIEW:
          return { ...state, gridView: false };

      case UPDATE_SORT:
          return { ...state, sort: action.payload };

      case SORT_PRODUCTS: {
          const { sort, filteredProducts } = state;
          let tempProducts = [...filteredProducts];

          if (sort === "price-lowest") {
              // rastuci niz
              // parseInt jer je u firebase .price stavljena kao string
              tempProducts = tempProducts.sort(
                  (a, b) => parseInt(a.price) - parseInt(b.price)
              );
          }

          if (sort === "price-highest") {
              // opadajuci niz
              tempProducts = tempProducts.sort(
                  (a, b) => parseInt(b.price) - parseInt(a.price)
              );
          }

          if (sort === "name-a") {
              // localeCompare je case INSENSITIVE i kraca varijanta spram stavljenja if petlji
              tempProducts = tempProducts.sort((a, b) =>
                  a.name.localeCompare(b.name)
              );
          }

          if (sort === "name-z") {
              tempProducts = tempProducts.sort((a, b) => {
                  return b.name.localeCompare(a.name);
              });
          }

          return { ...state, filteredProducts: [...tempProducts] };
      }

      case UPDATE_FILTERS: {
          const { name, value } = action.payload;
          return { ...state, filter: { ...state.filter, [name]: value } };
      }

      case FILTER_PRODUCTS: {
          console.log('FILTER RADI');
          return {...state}
      }
  }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
