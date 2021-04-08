import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {FindProductForm, UpdateProductForm} from '../components';
import {useGlobalContext} from '../context/global_context';

const UpdateProductPage = () => {

    const [product, setProduct] = useState(null);
    const [findId, setFindId] = useState('');
    const {openModal, closeModal} = useGlobalContext();

    const findProductSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await axios(`/allproducts/${findId}`);
            //console.log(data);
            closeModal();
            setProduct(data.data);
        } catch (error) {
            if (error.response) {
                openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});
    
            } else {
            // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
            openModal({showModal: true, modalMsg: error.message, modalError: true});
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
            openModal({showModal: true, modalMsg: 'Proizvod uspešno izmenjen.', modalError: false});
        } catch (error) {
            if (error.response) {
                openModal({showModal: true, modalMsg: error.response.data.message, modalError: true});    
            } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: error.message, modalError: true});
            }        
        }
    }

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