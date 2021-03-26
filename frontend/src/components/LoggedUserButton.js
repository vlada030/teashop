import React, {useEffect} from "react";
import styled from "styled-components";

import { useUserContext } from "../context/user_context";
import { useCartContext } from "../context/cart_context";
import { useGlobalContext } from "../context/global_context";
import { Link } from "react-router-dom";

const LoggedUserButton = () => {
    const { logout, user, userLogout} = useUserContext();
    const { clearCart} = useCartContext();
    const { closeSidebar} = useGlobalContext();

    let transformedName = user.username;

    if (transformedName.length > 13 ) {
    
        transformedName = `${transformedName.substring(0, 10)}...`;
    }

    return (
        <Wrapper>
            <p>{transformedName}</p>
            <ul>
                <li>
                    <button onClick={() => {
                        userLogout();
                        clearCart();
                    }}>odjava</button>
                </li>
                <li>
                    <Link to="/checkout" onClick={closeSidebar}>omiljeni</Link>
                </li>
                <li>
                    <Link to="/products" onClick={closeSidebar}>izmeni proizvod</Link>
                </li>
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
        letter-spacing: var(--spacing);
        cursor: pointer;
        margin: 0;
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
        }
    }    

    ul {
        position: absolute;
        top: -50%;
        left: 0;
        opacity: 0;
        visibility: hidden;
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
            font: inherit;
            font-size: inherit;
            letter-spacing: inherit;
            cursor: pointer;
        }       
    }

    @media screen and (min-width: 992px) {
        ul {
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
    }
`;

export default LoggedUserButton;
