import React from "react";
import { FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoggedUserButton from "./LoggedUserButton";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { useGlobalContext } from "../context/global_context";

export const Buttons = ({ user, totalItems, closeSidebar, userLogout, clearCart }) => {
    return (
        <Wrapper>
            {user?.role !== "admin" ? (
                <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
                    Korpa
                    <span className="cart-container">
                        <FaShoppingCart />
                        <span className="cart-value">{totalItems}</span>
                    </span>
                </Link>
            ) : null}

            {!user ? (
                <Link
                    to="/authentication"
                    className="auth-btn"
                    onClick={closeSidebar}
                >
                    Prijava
                    <FaUserPlus />
                </Link>
            ) : (
                // <button className='auth-btn' onClick={() => {
                //   logout({ returnTo: window.location.origin });
                // }}>
                //   Odjava
                //   <FaUserMinus />
                // </button>

                <LoggedUserButton
                    user={user}
                    userLogout={userLogout}
                    clearCart={clearCart}
                    closeSidebar={closeSidebar}
                />
            )}
        </Wrapper>
    );
};

const CartButtons = () => {
    const { closeSidebar } = useGlobalContext();
    const { totalItems, clearCart } = useCartContext();
    const { user, userLogout } = useUserContext();

    return (
        <Buttons
            closeSidebar={closeSidebar}
            totalItems={totalItems}
            user={user}
            userLogout={userLogout}
            clearCart={clearCart}
        />
    );
};

const Wrapper = styled.div`
    @media screen and (min-width: 992px) {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        //width: 250px;
    }

    .cart-btn {
        padding-left: 1.5rem;
        padding-right: 1rem;
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;
        align-items: center;
        //margin-right: 2rem;
        border: 2px solid transparent;
        transition: var(--transition);

        @media screen and (min-width: 992px) {
            padding-left: 0;

            &:hover {
                border-bottom: 2px solid var(--clr-primary-7);
            }
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
        svg {
            margin-left: 5px;
        }

        padding-left: 1.5rem;
        margin-top: 2rem;

        @media screen and (min-width: 992px) {
            padding-left: 0;
            margin-top: 0;

            &:hover {
                border-bottom: 2px solid var(--clr-primary-7);
            }
        }
    }
`;
export default CartButtons;
