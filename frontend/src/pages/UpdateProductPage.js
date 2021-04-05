import React from 'react';
import styled from 'styled-components';

const UpdateProductPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return <Wrapper className='section-center page-100'>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label>Unesite sifru proizvoda</label>
                        <input type='text'name='id' />
                    </div>
                    <button type='submit' className='btn'>pronadji proizvod</button>
                </form>
            </Wrapper>
}

const Wrapper = styled.main`
    border-radius: var(--radius);
    background: linear-gradient(transparent, var(--clr-primary-10));  
    text-align: center;

    form {
        background: var(--clr-primary-9);
        padding: 3rem;
    }

    .form-control {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        label {
            margin-bottom: 1rem;
        }
    }
`;
export default UpdateProductPage;