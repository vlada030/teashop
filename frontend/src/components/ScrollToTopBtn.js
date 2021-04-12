import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiArrowUpOutline } from "react-icons/ti";

const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <React.Fragment>
            {isVisible && (
                <Wrapper onClick={scrollToTop}>
                    <TiArrowUpOutline />
                </Wrapper>
            )}
        </React.Fragment>
    );
};

const Wrapper = styled.div`
    position: fixed;
    top: 90vh;
    right: 2rem;
    background-color: var(--clr-primary-5);
    border: 1px solid var(--clr-white);
    border-radius: var(--radius);
    border-radius: 50%;
    cursor: pointer;
    transition: var(--transition);

    display: grid;
    place-items: center;
    padding: 0.2rem;

    &:hover,
    &:active {
        background-color: var(--clr-primary-3);
    }

    svg {
        width: 2rem;
        height: 2rem;
        color: var(--clr-primary-8);
    }
`;

export default ScrollToTopBtn;
