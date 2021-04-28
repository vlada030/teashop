import React from "react";
import styled from 'styled-components';
import {
    FormTextAreaElement,
    FormInputTextElement,
    FormInputNumberElement,
    FormCheckboxElement
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
            />

            <FormInputNumberElement
                label="unesite količinu :"
                name="stock"
                step={10}
                min={0}
                placeholder="npr 1250"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormInputNumberElement
                label="unesite cenu :"
                name="price"
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
            />

            <div className="elem-container">
                <p>pakovanje :</p>
                <div className="checkbox-container">
                    <FormCheckboxElement 
                        addClass={true}
                        label="30 gr"
                        name="package-30"
                        id="package-30"
                        checked={product.package.includes("30")}
                        handleFormChange={handleFormChange}
                    />

                    <FormCheckboxElement 
                        addClass={true}
                        label="50 gr"
                        name="package-50"
                        id="package-50"
                        checked={product.package.includes("50")}
                        handleFormChange={handleFormChange}
                    />

                    <FormCheckboxElement 
                        addClass={true}
                        label="100 gr"
                        name="package-100"
                        id="package-100"
                        checked={product.package.includes("100")}
                        handleFormChange={handleFormChange}
                    />
                </div>
            </div>

            <FormCheckboxElement
                label="istakni proizvod :"
                name="featured"
                id="checkboxInput"
                checked={product.featured}
                handleFormChange={handleFormChange}
            />

            <FormInputNumberElement
                label="unesite ocenu :"
                name="stars"
                step={0.1}
                min={0}
                max={5}
                placeholder="npr 5"
                product={product}
                handleFormChange={handleFormChange}
            />

            <FormInputNumberElement
                label="unesite broj pregleda :"
                name="reviews"
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

            <div className="elem-container">
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
    text-align: center;

    h4 {
        margin-bottom: 2rem;
        font-weight: 400;
    }

    hr {
        margin-bottom: 3rem;
    }

    .elem-container {
        display: grid;
        
        p {
            margin-bottom: 0;
            color: inherit;
            &::first-letter {
                text-transform: uppercase;
            }
        }

        .btn-addition {
            margin: 2rem 0;
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

    @media screen and (min-width: 700px) {
        max-width: var(--fixed-width-2);
        margin: 0 auto;

        .elem-container {
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