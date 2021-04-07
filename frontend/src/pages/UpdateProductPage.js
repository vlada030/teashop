import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {FindProductForm, UpdateProductForm} from '../components';

const UpdateProductPage = () => {

    const [product, setProduct] = useState(null);
    const [findId, setFindId] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState(null);

    const findProductSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios(`/allproducts/${findId}`);
            //console.log(data);
            setProduct(data.data);
            //dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data});
        } catch (error) {
            if (error.response) {
            //dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.response.data});
    
            } else {
            // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
            //dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.message});
            }        
        }
    }

    const updateProductSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios({
                url: `/allproducts/${product.id}`,
                method: 'PUT',
                data: product
            });
            //console.log(data);
            setProduct(null);
            //dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: data.data});
        } catch (error) {
            if (error.response) {
            //dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.response.data});
    
            } else {
            // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
            //dispatch({type: GET_SINGLE_PRODUCT_ERROR, payload: error.message});
            }        
        }
    }

    const resetUpdateForm = () => {
        setProduct(null);
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