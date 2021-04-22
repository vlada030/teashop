import React from 'react';
import styled from 'styled-components';
import {AiOutlineCloseCircle} from "react-icons/ai"; 

const ConfirmationDialog = () => {
    return (
        <Wrapper>
            <article className='card'>
                <p className='card-header'>
                    naslov
                    <button>
                        <AiOutlineCloseCircle />
                    </button>
                </p>

                <p className='card-body'>potvrdite brisanje dokumenta ?</p>

                <p className='card-footer'>
                    <button>otkaži</button>
                    <button>potvrdi</button>
                </p>

            </article>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: var(--background);
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
        color: var(--clr-primary-7);
        transition: var(--transition);

        &:hover {
                color: var(--clr-primary-1);
            }
    }

    .card {
        /* position: absolute;
        top: 10rem;
        left: 50%;
        transform: translateX(-50%); */
        margin: 10rem auto 0 auto;
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
            color: var(--clr-primary-1);
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