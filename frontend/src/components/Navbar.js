import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
// eslint-disable-next-line
import { FaBars } from 'react-icons/fa'
import { SiGitea } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useGlobalContext } from '../context/global_context'
import { useUserContext } from '../context/user_context'

const Nav = () => {
  const {openSidebar} = useGlobalContext();
  const {customer} = useUserContext();

  return <NavContainer>
          <div className='nav-center'>
            <div className='nav-header'>
              <Link to='/'>
                <img src={logo} alt='tea' />
              </Link>
              <button type='button' className='nav-toggle' onClick={openSidebar}>
                <SiGitea />
              </button>
            </div>

            <ul className='nav-links'>
              {links.map(link => {
                const {id, text, url} = link;
                return <li key={id}>
                        <Link to={url}>{text}</Link>
                      </li>
              })}
              { customer &&
                <li>
                  <Link to='/checkout'>kasa</Link>
                </li>
              }
            </ul>

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
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
      scale: 1;
      transition: var(--transition);
      &:hover {
        scale: 1.05;
      }
    }
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
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
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
      display: grid;
    }
  }
`

export default Nav
