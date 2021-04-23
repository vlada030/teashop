import React from 'react';
import styled from 'styled-components';
import FindProductForm  from './FindProductForm';
import ProductHandleForm from './ProductHandleForm';
import useProductHandle from '../customHooks/productHandleHook';

const UpdateProduct = () => {    
    const {product, findId, resetForm, findProductSubmit, updateProductSubmit, setFindId, updatePropertyValue} = useProductHandle();
    
    return (
        <Wrapper>
            {product && product.id ? (
                <ProductHandleForm isUpdatePage={true} product={product} handleSubmit={updateProductSubmit} handleFormReset={resetForm} handleFormChange={updatePropertyValue} />
            ) : (
                <FindProductForm title='pronađi proizvod' handleSubmit={findProductSubmit} findId={findId} setFindId={setFindId} />
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-radius: var(--radius);
    //margin: 1rem 0;
    min-height: 100%;
    display: grid;
    place-items: center;
`;

export default UpdateProduct;