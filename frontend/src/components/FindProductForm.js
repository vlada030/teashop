import React from "react";
import styled from 'styled-components';

const FindProductForm = ({handleSubmit}) => {
    return (
        <Wrapper onSubmit={handleSubmit}>
            <div className="form-control">
                <label>Unesite šifru proizvoda :</label>
                <input type="text" name="id" placeholder="npr 12345" />
            </div>
            <button type="submit" className="btn">
                pronađi proizvod
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.form`
    
    background: var(--clr-primary-9);
    border-radius: var(--radius);
    padding: 3rem;    

    .form-control {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;

        label {
           margin-bottom: 1rem;
        }

        input {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid var(--clr-primary-5);
            border-radius: var(--radius);
            text-align: center;
            font: inherit;
            letter-spacing: var(--spacing);
            transition: var(--transition);

            &:focus {
                border-bottom: 1px solid var(--clr-primary-4);
                box-shadow: var(--light-shadow); 
                outline: none;
            }

            &::placeholder {
                font-style: italic;
            }
        }
    }

    @media screen and (min-width: 992px) {
        .form-control {
            flex-direction: row;

            label {
                margin: 0 1rem 0 0;
            }
        }            
    }    
`;

export default FindProductForm;