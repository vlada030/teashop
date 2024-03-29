import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'

const CartContent = () => {

  const {cart, clearCart} = useCartContext();

  return <Wrapper className='section section-center'>
          <CartColumns />

          {cart.map(item => {
            return <CartItem key={item.id} {...item} />
          })}

          <hr/>

          <div className='link-container'>
            <Link to='/products' className='link-btn'>
              nastavi kupovinu
            </Link>
            <button className='link-btn clear-btn' onClick={clearCart}>
              isprazni korpu
            </button>
          </div>

          <CartTotals />
        </Wrapper>
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: var(--clr-primary-5);
    border: 2px solid transparent;
    text-align: center;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
    transition: var(--transition);
  }

  .link-btn:hover {
    color: var(--clr-primary-7)
  }

  .clear-btn {
    background: var(--clr-primary-1);
  }
`
export default CartContent
