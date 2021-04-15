import React from "react";
import styled from "styled-components";

import { useUserContext } from "../context/user_context";
import { useCartContext } from "../context/cart_context";
import { useGlobalContext } from "../context/global_context";
import { Link } from "react-router-dom";

const LoggedUserButton = () => {
    const { user, userLogout} = useUserContext();
    const { clearCart} = useCartContext();
    const { closeSidebar} = useGlobalContext();

    let transformedName = user.username;

    transformedName = transformedName.split(' ')[0];

    if (transformedName.length > 9 ) {
    
        transformedName = `${transformedName.substring(0, 7)}...`;
    }

    return (
        <Wrapper>
            <p>{transformedName}</p>
            <ul>
                <li>
                    <button
                        onClick={() => {
                            userLogout();
                            clearCart();
                            closeSidebar();
                        }}
                    >
                        odjava
                    </button>
                </li>
                <li>
                    <Link to="/products/favorites" onClick={closeSidebar}>
                        {" "}
                        {`omiljeni (${user.favorites.length})`}
                    </Link>
                </li>

                {user && user.role === "admin" ? (
                    <React.Fragment>
                        <li>
                            <Link
                                to="/products/update-product"
                                onClick={closeSidebar}
                            >
                                izmeni proizvod
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/products/create-product"
                                onClick={closeSidebar}
                            >
                                dodaj proizvod
                            </Link>
                        </li>
                    </React.Fragment>
                ) : null}
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 2rem;
    color: var(--clr-grey-1);
    transition: var(--transition);
    position: relative;

    p {
        text-align: left;
        padding-left: 1.5rem;
        
        font-size: 1.5rem;
        //letter-spacing: var(--spacing);
        cursor: pointer;
        //margin: 0;

        &::first-letter {
            text-transform: capitalize;
        }
    }

    &:hover > ul {
        top: 100%;
        opacity: 1;
        visibility: visible;
        transition: var(--transition);
    }

    @media screen and (min-width: 992px) {
        margin-top: 0;
        z-index: 10;
        p {
            padding-left: 0;
            text-align: center;
        }
    }    

    ul {
        color: var(--clr-grey-2);
        font-size: 1rem;
        text-align: left;
        padding-left: 1.5rem;
        width: 100%;
    }

    li {
        letter-spacing: var(--spacing);
        padding: 1rem 0;
        border-bottom: 2px solid transparent;
        transition: var(--transition);
        text-transform: capitalize;

        &:hover {
            background: var(--clr-grey-10);
            padding-left: 0.5rem;
            color: var(--clr-grey-2);
        }

        a {
            color: inherit;
            transition: var(--transition);
        }

        button {
            background-color: transparent;
            border: none;
            color: inherit;
            font: inherit;
            font-size: inherit;
            letter-spacing: inherit;
            cursor: pointer;
            text-transform: capitalize;
            
        }       
    }

    @media screen and (min-width: 992px) {
        p {
            margin: 0 2rem;
        }

        ul {
            position: absolute;
            top: -50%;
            left: 0;
            opacity: 0;
            visibility: hidden;
            text-align: center;
            padding-left: 0;
            background: linear-gradient( transparent, var(--clr-primary-10));
            border-radius: var(--radius);
        }
        
        li:hover {
            padding-left: 0;
            background: transparent;
            color: var(--clr-grey-2);
            border-bottom: 2px solid var(--clr-primary-7);
        }

        button:focus {              
            outline: none;    
        }

        a {
            padding: .25rem 0.5rem;
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
        }
    }
`;

export default LoggedUserButton;
