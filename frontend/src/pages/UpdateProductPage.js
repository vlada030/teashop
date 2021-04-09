import React from 'react';
import styled from 'styled-components';
import {FindProductForm, UpdateProductForm} from '../components';
import {useGlobalContext} from '../context/global_context';
import useUpdateProduct from '../customHooks/updateProductHook';

const UpdateProductPage = () => {    
    const {closeModal} = useGlobalContext();
    const {product, findId, findProductSubmit, updateProductSubmit, setProduct, setFindId} = useUpdateProduct();
    
    const resetUpdateForm = () => {
        setProduct(null);
        closeModal();
    }

    const updatePropertyValue = (name, value) => {
        //console.log({name, value});
        setProduct({...product, [name]: value});
    }

    return (
        <Wrapper className="section-center page-100">
            {product ? (
                <UpdateProductForm product={product} handleSubmit={updateProductSubmit} handleFormReset={resetUpdateForm} handleFormChange={updatePropertyValue} />
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