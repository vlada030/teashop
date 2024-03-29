// prekopirano sve sa stripe custom payment flow
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    useStripe,
    Elements,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import useProductHandle from '../customHooks/productHandleHook';
import { formatPrice } from "../utils/helpers";
//import { useHistory } from "react-router-dom";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const CheckoutForm = () => {
    const { cart, totalAmount, shipping, clearCart } = useCartContext();
    const { user } = useUserContext();
    const {axiosUpdateProductFromStripe} = useProductHandle();
    //const history = useHistory();

    // stripe da bi radio, prekopirano
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },

            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    const createPaymentIntent = async () => {
        try {
            const { data } = await axios.post('/create-payment-intent', { cart, totalAmount, shipping });
            setClientSecret(data.clientSecret)           
        } catch (error) {
            //console.log(error.response);
        }
    };

    useEffect(() => {
        createPaymentIntent();
        // eslint-disable-next-line
    }, []);

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (payload.error) {
            setError(`Plaćanje nije uspelo. ${payload.error.message}`);
            setProcessing(false);
            
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);

            // updejtuj bazu
            axiosUpdateProductFromStripe(cart);
            setTimeout(() => {
                clearCart();
                //history.push('/');
                window.location.pathname = '/';

            }, 5000)
        }
    };

    const totalPriceAndShipping = () => {
        const updatedCost = totalAmount >= 3000 ? totalAmount : totalAmount + shipping;
        return formatPrice(updatedCost);
    }

    return (
        <div>
            {succeeded ? (
                <article>
                    <h4>Plaćanje je uspešno.</h4>
                    <h4>Hvala na kupovini!</h4>
                    <h4>Vraćanje na početnu stranu...</h4>
                </article>
            ) : (
                <article>
                    <h4>Zdravo {user.username}</h4>
                    <p>Vaš ukupan račun iznosi {totalPriceAndShipping()}.</p>
                </article>
            )}
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                />
                <button
                    disabled={processing || succeeded || disabled}
                    id="submit"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Plati"
                        )}
                    </span>
                </button>

                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}

                {/* Show a success message upon completion */}
                {/* <p
                    className={
                        succeeded ? "result-message" : "result-message hidden"
                    }
                >
                    Plaćanje uspešno! see the result in your
                    <a href={`https://dashboard.stripe.com/test/payments`}>
                        {" "}
                        Stripe dashboard.
                    </a>{" "}
                    Refresh the page to pay again.
                </p> */}
            </form>
            <p className='additional-info'>*** test kartica: 4242 4242 4242 4242</p>
            <p className='additional-info'>*** MM/YY: buduci datum</p>
            <p className='additional-info'>*** CVC : bilo koje 3 cifre</p>
            <p className='additional-info'>*** ZIP : bilo koje 5 cifre</p>
        </div>
    );
};

const StripeCheckout = () => {
    return (
        <Wrapper>
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    article {
        margin-top: 2rem;
    }

    form {
        width: 95vw;
        align-self: center;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
            0px 2px 5px 0px rgba(50, 50, 93, 0.1),
            0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
        border-radius: 7px;
        padding: 40px;
    }
    input {
        border-radius: 6px;
        margin-bottom: 6px;
        padding: 12px;
        border: 1px solid rgba(50, 50, 93, 0.1);
        max-height: 44px;
        font-size: 16px;
        width: 100%;
        background: white;
        box-sizing: border-box;
    }
    .result-message {
        line-height: 22px;
        font-size: 16px;
    }
    .result-message a {
        color: rgb(89, 111, 214);
        font-weight: 600;
        text-decoration: none;
    }
    .hidden {
        display: none;
    }
    #card-error {
        color: rgb(105, 115, 134);
        font-size: 16px;
        line-height: 20px;
        margin-top: 12px;
        text-align: center;
    }
    #card-element {
        border-radius: 4px 4px 0 0;
        padding: 12px;
        border: 1px solid rgba(50, 50, 93, 0.1);
        max-height: 44px;
        width: 100%;
        background: white;
        box-sizing: border-box;
    }
    #payment-request-button {
        margin-bottom: 32px;
    }
    /* Buttons and links */
    button {
        background: var(--clr-primary-5);
        font-family: Arial, sans-serif;
        color: #ffffff;
        border-radius: 0 0 4px 4px;
        border: 0;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: var(--spacing);
        cursor: pointer;
        display: block;
        transition: all 0.2s ease;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        width: 100%;
    }
    button:hover {
        filter: contrast(115%);
    }
    button:disabled {
        opacity: 0.5;
        cursor: default;
    }
    /* spinner/processing state, errors */
    .spinner,
    .spinner:before,
    .spinner:after {
        border-radius: 50%;
    }
    .spinner {
        color: #ffffff;
        font-size: 22px;
        text-indent: -99999px;
        margin: 0px auto;
        position: relative;
        width: 20px;
        height: 20px;
        box-shadow: inset 0 0 0 2px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
    }
    .spinner:before,
    .spinner:after {
        position: absolute;
        content: "";
    }
    .spinner:before {
        width: 10.4px;
        height: 20.4px;
        background: #5469d4;
        border-radius: 20.4px 0 0 20.4px;
        top: -0.2px;
        left: -0.2px;
        -webkit-transform-origin: 10.4px 10.2px;
        transform-origin: 10.4px 10.2px;
        -webkit-animation: loading 2s infinite ease 1.5s;
        animation: loading 2s infinite ease 1.5s;
    }
    .spinner:after {
        width: 10.4px;
        height: 10.2px;
        background: #5469d4;
        border-radius: 0 10.2px 10.2px 0;
        top: -0.1px;
        left: 10.2px;
        -webkit-transform-origin: 0px 10.2px;
        transform-origin: 0px 10.2px;
        -webkit-animation: loading 2s infinite ease;
        animation: loading 2s infinite ease;
    }
    @keyframes loading {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @media only screen and (min-width: 600px) {
        form {
            width: 80vw;
        }
    }

    @media only screen and (min-width: 900px) {
        form {
            width: 60vw;
        }
    }

    @media only screen and (min-width: 1200px) {
        form {
            width: 40vw;
        }
    }


    .additional-info {
        text-align: left;
        margin: 0;
        margin-top: 0.5rem;

        &:last-child{
            margin-bottom: 2rem;

        }
    }
`;

export default StripeCheckout;
