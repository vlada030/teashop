import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import {useGlobalContext} from '../context/global_context'

const CartButtons = () => {

const {closeSidebar} = useGlobalContext();
const {totalItems} = useCartContext();
const {loginWithRedirect, logout, customer} = useUserContext();

  return <Wrapper className='cart-btn-wrapper'>
          <Link to='/cart' className='cart-btn'  onClick={closeSidebar}>
            Korpa
            <span className='cart-container'>
              <FaShoppingCart />
              <span className='cart-value'>
                {totalItems}
              </span>
            </span>
          </Link>
          { !customer ?
            <button className='auth-btn' onClick={loginWithRedirect}>
              Prijava 
              <FaUserPlus />
            </button>
          :
            <button className='auth-btn' onClick={() => {
              logout({ returnTo: window.location.origin });
            }}>
              Odjava 
              <FaUserMinus />
            </button>
          }
        </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 250px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    align-items: center;
    margin-right: 2rem;
    border: 2px solid transparent;
    transition: var(--transition);
    &:hover {
      border-bottom: 2px solid var(--clr-primary-7);
    }
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    border: 2px solid transparent;
    transition: var(--transition);
    &:hover {
      border-bottom: 2px solid var(--clr-primary-7);
    }
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
