import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  // proveri da li postoji taj proizvod sa drugim pakovanjem i izracunaj ukupnu tezinu proizvoda u korpi
  const totalWeightCalc = (id) => {
    const productCode = id.substring(0, 5);
    return state.cart.reduce((sum, item) => {
        if (item.id.startsWith(productCode)) {
            return sum + parseInt(item.unit) * parseInt(item.amount);
        }
        return sum;
    }, 0);
  }

  switch (action.type) {
    case ADD_TO_CART: {
      const {id, unit, price, amount, product} = action.payload;
      // caka da nebi stavljali && pa da proveravamo dva uslova i id i pakovanje, ovako se spoji u jedan
      const tempItem = state.cart.find(i => i.id === id + unit);
      if (tempItem) {
        const tempCart = state.cart.map((item) => {
            if (item.id === id + unit) {
                let updatedAmount = amount + item.amount;
                return { ...item, amount: updatedAmount };
            } else {
                return item;
            }
        });
        return {...state, cart: tempCart}
        
      } else {
        const newItem = {
          id: id + unit,
          name: product.name,
          unit,
          price, 
          amount,
          image: product.images[0],
          stock: product.stock
        };
        return {...state, cart: [...state.cart, newItem]}
      }
    }

    case REMOVE_CART_ITEM: {
      const updatedCart = state.cart.filter(item => {
        return item.id !== action.payload
      })

      return {...state, cart: updatedCart}
    }

    case CLEAR_CART: {
      return {...state, cart: []}
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const {id, value} = action.payload;

      // preracunaj ukupnu tezinu
      const presentWeight = totalWeightCalc( id );

      const tempCart = state.cart.map(item => {
        if (item.id === id) {

          let updatedAmount = item.amount;

          if (value === 'inc') {
            if (presentWeight + parseInt(item.unit) <= parseInt(item.stock)) {
              updatedAmount += 1;
            }
            console.log({presentWeight: presentWeight + parseInt(item.unit), unit: item.unit, stock:item.stock });
          }

          if (value === 'dec') {
            if (updatedAmount > 1) {
              updatedAmount -= 1;
            } 
          }

          return {...item, amount: updatedAmount}
        }

        return item
      })

      return {...state, cart: tempCart}
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
