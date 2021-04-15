import React from 'react';
import styled from 'styled-components';
import {FindProductForm, ProductHandleForm} from '../components';
import {useGlobalContext} from '../context/global_context';
import useProductHandle from '../customHooks/productHandleHook';

const UpdateProductPage = () => {    
    const {closeModal} = useGlobalContext();
    const {product, findId, updatePage, resetForm, findProductSubmit, updateProductSubmit, setFindId, updatePropertyValue} = useProductHandle();
    
    return (
        <Wrapper className="section-center page-100">
            {product ? (
                <ProductHandleForm isUpdatePage={true} product={product} handleSubmit={updateProductSubmit} handleFormReset={resetForm} handleFormChange={updatePropertyValue} />
            ) : (
                <FindProductForm handleSubmit={findProductSubmit} findId={findId} setFindId={setFindId} />
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