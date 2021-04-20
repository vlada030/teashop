import React, {useEffect} from 'react';
import styled from 'styled-components'; 
import useProductHandle from '../customHooks/productHandleHook';
import ProductHandleForm from './ProductHandleForm';

const CreateProduct = () => {
    const {product, resetForm, updatePropertyValue, createProductSubmit} = useProductHandle();

    return (
        <Wrapper>
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
    margin: 1rem 0;
   
`;

export default CreateProduct;