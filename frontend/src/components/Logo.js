import React from "react";
import { SiGitea } from "react-icons/si";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global_context";
import styled from "styled-components";

// preradjena komponenta radi testiranja - primer Dependency Injection
export const Button = ({ handleSidebar }) => {
    return (
        <button type="button" className="nav-toggle" onClick={handleSidebar}>
            <SiGitea />
        </button>
    );
};

const Logo = () => {
    const { openSidebar } = useGlobalContext();

    return (
        <Wrapper>
            <Link to="/" className="logo">
                tea shop
            </Link>
            <Button handleSidebar={openSidebar}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    /* img {
      width: 175px;
      margin-left: -15px;
      scale: 1;
      transition: var(--transition);
      &:hover {
        scale: 1.05;
      }
    } */
    .logo {
        font-size: 2.5rem;
        color: var(--clr-primary-5);
        //font-weight: 600;
        letter-spacing: var(--spacing);
        text-shadow: 2px 2px 5px var(--clr-primary-5);
        text-transform: capitalize;
        font-style: italic;
        transition: var(--transition);
        margin-bottom: 1rem;

        &:hover {
            text-shadow: 3px 3px 8px var(--clr-primary-5);
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
                    transform: rotate(-30deg);
                }
                50% {
                    transform: rotate(30deg);
                }
                100% {
                    transform: rotate(0deg);
                }
            }
        }
    }

    @media (min-width: 992px) {
        .nav-toggle {
            display: none;
        }
    }
`;

export default Logo;
