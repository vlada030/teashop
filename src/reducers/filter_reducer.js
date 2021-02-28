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

      case CLEAR_FILTERS: {
          const {text, category, illness, unit} = action.payload;
          return {...state, filter: {...state.filter, text, category, illness, unit, price: state.filter.maxPrice}}
      }

      case FILTER_PRODUCTS: {
          const {allProducts} = state;
          const {text, category, illness, unit, price, maxPrice} = state.filter;
          let tempProducts = [...allProducts];

					// filtriranje na osnovu unetog texta
          if (text) {
              tempProducts = tempProducts.filter(product => {
                //   return product.name.toLowerCase().includes(text) || product.description.toLowerCase().includes(text)
                return `${product.name + product.description}`.toLowerCase().includes(text)
              })
          }

					// filtriranje kategorije caja
					if (category !== 'svi') {
						tempProducts = tempProducts.filter(product => {
							return product.category === category
						})
					}

					// filtriranje simptoma
					if (illness !== 'svi') {
						tempProducts = tempProducts.filter(product => product.filter.includes(illness))
					}

					// filtriranje pakovanja
					if (unit !== 'svi') {
						tempProducts = tempProducts.filter(product => product.package.includes(unit));
					}

					// filtriranje na osnovu cene
					if (price !== maxPrice) {
						tempProducts = tempProducts.filter(product => product.price <= price)
					}
          return {...state, filteredProducts: tempProducts}
      }
  }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
