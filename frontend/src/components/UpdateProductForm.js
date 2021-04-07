import React, {useEffect, useRef} from "react";
import styled from 'styled-components';

const UpdateProductForm =  ({product, handleSubmit, handleFormReset, handleFormChange}) => {

    const stockField = useRef();

    useEffect(() => {
        stockField.current.focus();
    }, []);

    return (
        <Wrapper onSubmit={handleSubmit}>
            <h4>Izmeni proizvod</h4>
            <hr />
            <div className="form-control">
                <label>šifra proizvoda :</label>
                <p>{product.id}</p>
            </div>

            <div className="form-control">
                <label>naziv :</label>
                <p>{product.name}</p>
            </div>

            <div className="form-control">
                <label>unesite novu količinu :</label>
                <input
                    type="number"
                    step="10"
                    name="stock"
                    placeholder="npr 1250"
                    value={product.stock}
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                    ref={stockField}
                />
            </div>

            <div className="form-control">
                <label>unesite novu cenu :</label>
                <input
                    type="number"
                    step="50"
                    name="price"
                    placeholder="npr 1500"
                    value={product.price}
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                />
            </div>

            <div className="form-control">
                <label>kategorija proizvoda :</label>
                <input
                    type="text"
                    name="category"
                    placeholder="npr biljni"
                    value={product.category}
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                />
            </div>

            <div className="form-control">
                <label>pakovanje (grami) :</label>
                <p>{product.package.join(", ")}</p>
            </div>

            <div className="form-control">
                <label>opis :</label>
                <textarea
                    rows='8'
                    placeholder="Unesite opis proizvoda"
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                    value={product.description}
                    name='description'
                >
                </textarea>
            </div>
            <div className="form-control">
                <label>priprema :</label>
                <textarea
                    rows='8'
                    placeholder="Unesite pripremu proizvoda"
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                    value={product.preparation}
                    name='preparation'
                >
                </textarea>
            </div>
            <div className="form-control">
                <label>lekovitost :</label>
                <textarea
                    rows='8'
                    placeholder="Unesite lekovita dejstva"
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                    value={product.goal}
                    name='goal'
                >
                </textarea>
            </div>

            <div className="form-control">
                <label>neženjeno dejstvo :</label>
                <textarea
                    rows='8'
                    placeholder="Unesite neželjena dejstva"
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.value)
                    }
                    value={product.disclaimer}
                    name='disclaimer'
                >
                </textarea>
            </div>

            <div className="form-control">
                <button
                    type="button"
                    className="btn btn-addition"
                    onClick={handleFormReset}
                >
                    otkaži
                </button>

                <button type="submit" className="btn btn-addition">
                    pošalji
                </button>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.form`
    
    background: var(--clr-primary-9);
    border-radius: var(--radius);
    padding: 3rem;   
    
    h4 {
        margin-bottom: 2rem;
    }

    hr {
        margin-bottom: 3rem;
    }

    .form-control {
        display: grid;
        margin-bottom: 2rem;

        label {
           margin-bottom: 1rem;
           &::first-letter{
               text-transform: uppercase;
           }
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

        input, textarea {
            &::placeholder {
                font-style: italic;
            }
        }

        .btn-addition {
            margin: 1rem 0;
    
        }
    }    

    @media screen and (min-width: 700px) {
        max-width: var(--fixed-width-2);
        margin: 0 auto;

        .form-control {
            grid-template-columns: 1fr 1fr;
            justify-items: start;
            text-align: left;
            label {
                margin: 0 1rem 0 0;
            }
        } 
        
        .btn-addition {
            justify-self: center;
            width: 70%;
        }
    }    
`;

export default UpdateProductForm;