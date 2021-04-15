import React from 'react'; 
import styled from 'styled-components';

const FormTextAreaElement = ({label, name, placeholder, handleFormChange, product}) => {

    return <Wrapper>
                <label>{label}</label>
                <textarea
                    rows='8'
                    name={name}
                    placeholder={placeholder}
                    value={product.goal}
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }

                >
                </textarea>
            </Wrapper>
}

const Wrapper = styled.div`
    
    display: grid;
    margin-bottom: 2rem;

    label {
        margin-bottom: 1rem;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    textarea {
        width: 100%;
        resize: vertical;
        background-color: var(--clr-primary-8);
        border: none;
        padding: 0.5rem;
        font-family: inherit;
        color: inherit;
        overflow: auto;
    }

    textarea {
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

export default FormTextAreaElement;
