import React from "react";
import styled from 'styled-components';

const UpdateProductForm = ({handleSubmit}) => {
    return (
        <Wrapper onSubmit={handleSubmit}>
            <div className="form-control">
                <label>Šifra proizvoda :</label>
                <p>10023</p>
            </div>

            <div className="form-control">
                <label>naziv proizvoda :</label>
                <p>nana</p>
            </div>

            <div className="form-control">
                <label>Unesite novu količinu :</label>
                <input type="text" name="stock" placeholder="npr 1250" />
            </div>

            <div className="form-control">
                <label>Unesite novu cenu :</label>
                <input type="text" name="price" placeholder="npr 1500" />
            </div>

            <button type="submit" className="btn">
                pošalji
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.form`
    
    background: var(--clr-primary-9);
    border-radius: var(--radius);
    padding: 3rem;    

    .form-control {
        display: grid;
        margin: 2rem 0;

        label {
           margin-bottom: 1rem;
        }

        p {
            margin-bottom: 0;
        }

        input {
            width: 50%;
            margin: 0 auto;
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
        max-width: var(--fixed-width);
        margin: 0 auto;

        .form-control {
            grid-template-columns: 1fr 1fr;

            label {
                margin: 0 1rem 0 0;
            }
        }            
    }    
`;

export default UpdateProductForm;