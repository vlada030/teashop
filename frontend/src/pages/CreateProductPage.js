import React, {useEffect} from 'react';
import styled from 'styled-components'; 
import useProductHandle from '../customHooks/productHandleHook';
import {ProductHandleForm} from '../components'

const CreateProductPage = () => {
    const {product, resetForm, updatePropertyValue, createProductSubmit} = useProductHandle();

    return (
        <Wrapper className="section-center page-100">
            <ProductHandleForm
                isUpdatePage={false}
                product={product}
                handleSubmit={createProductSubmit}
                handleFormReset={resetForm}
                handleFormChange={updatePropertyValue}
            />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    border-radius: var(--radius);
    //background: linear-gradient(transparent, var(--clr-primary-10));  
    text-align: center;
`;

export default CreateProductPage;