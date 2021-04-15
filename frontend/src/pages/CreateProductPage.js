import React from 'react';
import styled from 'styled-components'; 
import useProductHandle from '../customHooks/productHandleHook';
import {ProductHandleForm} from '../components'

const CreateProductPage = () => {
    const {product, findId, resetForm, updateProductSubmit, setProduct, updatePropertyValue} = useProductHandle();

    return (
        <Wrapper className="section-center page-100">
            <ProductHandleForm
                isUpdatePage={false}
                product={ {package: []} }
                handleSubmit={updateProductSubmit}
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