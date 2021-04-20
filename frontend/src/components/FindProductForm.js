import React, {useEffect, useRef} from "react";
import styled from 'styled-components';

const FindProductForm = ({handleSubmit, findId, setFindId}) => {

    const idField = useRef();

    useEffect(() => {
        idField.current.focus()
    }, []);

    return (
        <Wrapper onSubmit={handleSubmit}>
            <h4>pronađi proizvod</h4>
            <hr />
            <div className="form-control">
                <label>unesite šifru proizvoda :</label>
                <input type="text" name="id" placeholder="npr 12345" value={findId} onChange={e => setFindId(e.target.value)} ref={idField}/>
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
    text-align: center;
    
    h4 {
        margin-bottom: 2rem;
    }

    hr {
        margin-bottom: 3rem;
    }

    .form-control {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;

        label {
           margin-bottom: 1rem;
           &::first-letter{
               text-transform: uppercase;
           }
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

    button {
        margin: 1rem 0;
    }

    @media screen and (min-width: 700px) {
        max-width: var(--fixed-width-2);
        margin: 0 auto;

        .form-control {
            flex-direction: row;

            label {
                margin: 0 1rem 0 0;
            }
        }            
    }    
`;

export default FindProductForm;