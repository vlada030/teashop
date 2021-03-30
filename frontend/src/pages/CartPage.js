import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {

  const {cart} = useCartContext();

  if (cart.length < 1) {
    return <Wrapper className='page-100'>
            <div className='empty'>
              <h2>vaša korpa je prazna</h2>
              <Link to='/products' className='btn'>pretražite proizvode</Link>
            </div>
          </Wrapper>
  }

  return <Wrapper className='page'>
          <PageHero title='korpa' />
          <div className='page'>
            <CartContent />
          </div>
        </Wrapper>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 3rem;

      /* &::first-letter {
        text-transform: capitalize;
      } */
    }
  }
`

export default CartPage