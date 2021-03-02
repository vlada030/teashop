import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
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
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
