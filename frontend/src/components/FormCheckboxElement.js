import React from "react";
import styled from "styled-components";

const FormCheckboxElement = ({label, name, id, checked, handleFormChange, addClass }) => {
    return(
        <Wrapper className={addClass ? 'checkbox-form' : null}>
            <p>{label}</p>
            <div className="checkbox">
                <input
                    type="checkbox"
                    name={name}
                    id={id}
                    checked={checked}
                    onChange={(e) =>
                        handleFormChange(e.target.name, e.target.checked)
                    }
                />
                <label htmlFor={id}></label>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    margin-bottom: 2rem;

    p {
        align-self: center;
        margin-bottom: 0;
        color: inherit;
        &::first-letter {
            text-transform: uppercase;
        }
    }

    label {
        margin-bottom: 1rem;
        &::first-letter {
            text-transform: uppercase;
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
        grid-template-columns: 1fr 1fr;
        justify-items: start;
        align-items: start;
        text-align: left;
        label {
            margin: 0 1rem 0 0;
        }
    }
`;

export default FormCheckboxElement;
