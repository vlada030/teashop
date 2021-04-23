import React from 'react';
import styled from 'styled-components';
import {AiOutlineCloseCircle} from "react-icons/ai"; 

const ConfirmationDialog = ({headerText, bodyText, handleCancel, handleConfirm, isOpen}) => {
    return (
        <Wrapper style={isOpen ? {display: 'block'} : null}>
            <article className='card'>
                <p className='card-header'>
                    {headerText}
                    <button onClick={handleCancel}>
                        <AiOutlineCloseCircle />
                    </button>
                </p>

                <p className='card-body'>{bodyText}</p>

                <p className='card-footer'>
                    <button onClick={handleCancel}>otkaži</button>
                    <button onClick={handleConfirm}>potvrdi</button>
                </p>

            </article>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: none;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--background);
    border-radius: var(--radius);
    z-index: 10;

    p {
        margin-bottom: 0;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    button {
        background-color: transparent;
        display: inline-block;
        border: none;
        cursor: pointer;
        color: var(--clr-primary-1);
        transition: var(--transition);

        &:hover {
                color: var(--clr-primary-1);
            }

        @media screen and (min-width: 992px) {
            color: var(--clr-primary-7);
        }
    }

    .card {
        /* position: absolute;
        top: 10rem;
        left: 50%;
        transform: translateX(-50%); */
        margin: 15vh auto 0 auto;
        width: 20rem;
        background-color: var(--clr-primary-9);
        border-radius: var(--radius);
    }
    
    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--clr-primary-5);
        border-radius: var(--radius) var(--radius) 0 0 ;
        padding: 0.5rem 0.75rem;       
        
        svg {
            font-size: 1.5rem;
            //color: var(--clr-primary-1);
            color: inherit;
        }
    }

    .card-body {
        padding: 2rem 1.5rem;
        border-bottom: 1px solid var(--clr-primary-5)
    }

    .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.5rem 0.75rem;

        button {
            padding: 0.5rem 0.75rem;
            font-family: inherit;
            font-size: inherit;
            text-transform: uppercase;           
        }        
    }
`;

export default ConfirmationDialog;