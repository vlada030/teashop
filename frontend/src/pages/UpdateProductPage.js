import React, {useState} from 'react';
import styled from 'styled-components';
import {FindProductForm, UpdateProductForm} from '../components';

const UpdateProductPage = () => {

    const [product, setProduct] = useState(true);

    const handleFindProductSubmit = (e) => {
        e.preventDefault();
    }

    const handleUpdateProductSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Wrapper className="section-center page-100">
            {product ? (
                <UpdateProductForm handleSubmit={handleUpdateProductSubmit} />
            ) : (
                <FindProductForm handleSubmit={handleFindProductSubmit} />
            )}
        </Wrapper>
    );
}

const Wrapper = styled.main`
    border-radius: var(--radius);
    //background: linear-gradient(transparent, var(--clr-primary-10));  
    text-align: center;
`;

export default UpdateProductPage;