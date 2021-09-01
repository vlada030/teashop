import React, { useContext } from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";

import { CartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

export const HelperCheckoutPage = ({ cart }) => {
    return (
        <main>
            <PageHero title="kasa" />
            <Wrapper className="page">
                {cart.length < 1 ? (
                    <div>
                        <h3>vaša korpa je prazna.</h3>
                        <Link to="/products" className="btn">
                            pretražite proizvode
                        </Link>
                    </div>
                ) : (
                    <StripeCheckout />
                )}
            </Wrapper>
        </main> 
    );
};

const CheckoutPage = () => {
    const { cart } = useContext(CartContext);
    
    return <HelperCheckoutPage cart={cart} />;
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    h3 {
        margin-bottom: 3rem;
    }
`;

export default CheckoutPage;
