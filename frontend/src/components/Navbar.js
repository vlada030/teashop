import React from 'react'
import styled from 'styled-components'
import Logo from './Logo';
import CartButtons from './CartButtons'
import NotAdminLinks from './NotAdminLinks'

const Nav = () => {

  return <NavContainer>
          <div className='nav-center'>
            <Logo />
            <NotAdminLinks />
            <CartButtons />
          </div>
        </NavContainer>
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
      animation: none;
      &:hover,
      &:active {
        animation: shake 0.4s linear;
      }

      @keyframes shake {
        0% {
          transform: rotate(-30deg)
        }
        50% {
          transform: rotate(30deg)
        }
        100% {
          transform: rotate(0deg)
        }
      }
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      justify-items: center;
    }
    .nav-toggle {
      display: none;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        border: 2px solid transparent;
        transition: var(--transition);
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      //justify-self: end;
      display: grid;
    }
  }
`

export default Nav
