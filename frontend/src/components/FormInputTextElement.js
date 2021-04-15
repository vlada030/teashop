import React from "react";
import styled from "styled-components";

const FormInputTextElement = ({label, name, placeholder, product, handleFormChange, isUpdatePage }) => {
    return (
        <Wrapper>
            <label>{label}</label>
            <input
                type='text'
                name={name}
                placeholder={placeholder}
                value={product.id}
                disabled={isUpdatePage}
                onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                }
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    margin-bottom: 2rem;

    label {
        margin-bottom: 1rem;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    input {
        width: 50%;
        margin: 0 auto;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid var(--clr-primary-5);
        text-align: center;
        font: inherit;
        letter-spacing: var(--spacing);
        transition: var(--transition);

        &:focus {
            border-bottom: 1px solid var(--clr-primary-4);
            box-shadow: var(--light-shadow);
            outline: none;
        }
    }

    input {
        border-radius: var(--radius);
        &::placeholder {
            font-style: italic;
        }
    }

    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        justify-items: start;
        text-align: left;
        label {
            margin: 0 1rem 0 0;
        }
    }
`;

export default FormInputTextElement;
