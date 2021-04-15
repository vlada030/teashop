import React, {useEffect, useRef} from "react";
import styled from 'styled-components';
import {
    FormTextAreaElement,
    FormInputTextElement,
    FormInputNumberElement,
} from "../components";

const ProductHandleForm =  ({isUpdatePage, product, handleSubmit, handleFormReset, handleFormChange}) => {

    // const stockField = useRef();

    // useEffect(() => {
    //     stockField.current.focus();
    // }, []);

    return (
        <Wrapper onSubmit={handleSubmit}>
            <h4>{isUpdatePage ? "Izmeni proizvod" : "Dodaj proizvod"}</h4>
            <hr />

            <FormInputTextElement
                label="šifra proizvoda :"
                name="id"
                placeholder="npr 12345"
                product={product}
                handleFormChange={handleFormChange}
                isUpdatePage={isUpdatePage}
            />

            <FormInputTextElement
                label="naziv :"
                name="name"
                placeholder="npr Kamilica"
                product={product}
                handleFormChange={handleFormChange}
                isUpdatePage={isUpdatePage}
            />

            <FormInputNumberElement 
                label='unesite količinu :'
                name='stock'
                step={10}
                min={0}
                placeholder="npr 1250"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormInputNumberElement 
                label='unesite cenu :'
                name='price'
                step={50}
                min={0}
                placeholder="npr 1500"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormInputTextElement
                label="kategorija proizvoda  :"
                name="category"
                placeholder="npr biljni"
                product={product}
                handleFormChange={handleFormChange}
                isUpdatePage={isUpdatePage}
            />

            <div className="form-control">
                <p>pakovanje :</p>
                <div className="checkbox-container">
                    <div className="checkbox-form">
                        <p>30 gr</p>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                name="package-30"
                                id="package-30"
                                checked={
                                    product && product.package.includes("30")
                                }
                                onChange={(e) =>
                                    handleFormChange(
                                        e.target.name,
                                        e.target.checked
                                    )
                                }
                            />
                            <label htmlFor="package-30"></label>
                        </div>
                    </div>

                    <div className="checkbox-form">
                        <p>50 gr</p>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                name="package-50"
                                id="package-50"
                                checked={
                                    product && product.package.includes("50")
                                }
                                onChange={(e) =>
                                    handleFormChange(
                                        e.target.name,
                                        e.target.checked
                                    )
                                }
                            />
                            <label htmlFor="package-50"></label>
                        </div>
                    </div>

                    <div className="checkbox-form">
                        <p>100 gr</p>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                name="package-100"
                                id="package-100"
                                checked={
                                    product && product.package.includes("100")
                                }
                                onChange={(e) =>
                                    handleFormChange(
                                        e.target.name,
                                        e.target.checked
                                    )
                                }
                            />
                            <label htmlFor="package-100"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-control">
                <p>istakni proizvod :</p>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="featured"
                        id="checkboxInput"
                        checked={product.featured}
                        onChange={(e) =>
                            handleFormChange(e.target.name, e.target.checked)
                        }
                    />
                    <label htmlFor="checkboxInput"></label>
                </div>
            </div>
            
            <FormInputNumberElement 
                label='unesite ocenu :'
                name='stars'
                step={0.1}
                min={0}
                max={5}
                placeholder="npr 4.8"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormInputNumberElement 
                label='unesite broj pregleda :'
                name='reviews'
                step={1}
                min={0}
                placeholder="npr 14"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormTextAreaElement
                label="ključne reči :"
                name="filter"
                placeholder="Unesite ključne reči za pretragu proizvoda, odvojene zarezom"
                product={product}
                handleFormChange={handleFormChange}
            />
            <FormTextAreaElement
                label="linkovi slika :"
                name="images"
                placeholder="Unesite linkove 4 slika, odvojene zarezom"
                product={product}
                handleFormChange={handleFormChange}
            />
            <FormTextAreaElement
                label="opis :"
                name="description"
                placeholder="Unesite opis proizvoda"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormTextAreaElement
                label="priprema :"
                name="preparation"
                placeholder="Unesite pripremu proizvoda"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormTextAreaElement
                label="lekovitost :"
                name="goal"
                placeholder="Unesite lekovita dejstva"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormTextAreaElement
                label="neželjeno dejstvo :"
                name="disclaimer"
                placeholder="Unesite neželjena dejstva"
                product={product}
                handleFormChange={handleFormChange}
            />

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
            &::first-letter {
                text-transform: uppercase;
            }
        }

        p {
            margin-bottom: 0;
            color: inherit;
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

        input,
        textarea {
            border-radius: var(--radius);
            &::placeholder {
                font-style: italic;
            }
        }

        .btn-addition {
            margin: 1rem 0;
        }
    }

    .checkbox-container {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .checkbox-form {
        display: flex;
        align-items: center;
        justify-items: space-between;

        p {
            margin-right: 2rem;
            width: 3rem;
        }
    }

    // checkbox style
    input[type="checkbox"] {
        visibility: hidden;
    }

    .checkbox {
        width: 40px;
        height: 10px;
        background: var(--clr-primary-8);
        margin: 20px auto;
        position: relative;
        border-radius: var(--radius);
    }
    .checkbox label {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;

        transition: var(--transition);
        cursor: pointer;
        position: absolute;
        top: -5px;
        left: -5px;

        background: var(--clr-primary-5);
    }

    .checkbox input[type="checkbox"]:checked + label {
        left: 27px;
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

export default ProductHandleForm;