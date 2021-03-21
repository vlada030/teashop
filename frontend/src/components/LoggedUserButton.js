import React, {useEffect} from "react";
import styled from "styled-components";

import { useUserContext } from "../context/user_context";
import { useCartContext } from "../context/cart_context";

const LoggedUserButton = () => {
    const { logout, user, userLogout} = useUserContext();
    const { clearCart} = useCartContext();

    let transformedName = user.username;

    if (transformedName.length > 13 ) {
    
        transformedName = `${transformedName.substring(0, 10)}...`;
    }

    return (
        <Wrapper
            onClick={() => {
                userLogout();
                clearCart();
            }}
        >
            <p>{transformedName}</p>
            <p>odjava</p>
        </Wrapper>
    );
};

const Wrapper = styled.button`
    border: 2px solid transparent;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);

    p {
        margin: 0;
        color: var(--clr-grey-1);

        &:first-child {
            padding-bottom: .4rem;
        }

        &:last-child {
            font-size: .8rem;
            padding-bottom: .2rem;
            opacity: .5;
            transition: var(--transition);
        }
    }
    &:hover {
        border-bottom: 2px solid var(--clr-primary-7);
        
        p:last-child {
            opacity: 1;
        }
    }
`;

export default LoggedUserButton;
