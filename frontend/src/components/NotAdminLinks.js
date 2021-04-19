import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../utils/constants';
import {useUserContext} from '../context/user_context';
import styled from 'styled-components';

const NotAdminLinks = () => {

    const {user} = useUserContext();
    return (
        <Wrapper>
            {user.role !== "admin" ? (
                <ul className="nav-links">
                    {links.map((link) => {
                        const { id, text, url } = link;
                        return (
                            <li key={id}>
                                <Link to={url}>{text}</Link>
                            </li>
                        );
                    })}
                    {user && (
                        <li>
                            <Link to="/checkout">kasa</Link>
                        </li>
                    )}
                </ul>
            ) : <li>Admin panel</li>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
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

  @media (min-width: 992px) {
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

  }
`;

export default NotAdminLinks;