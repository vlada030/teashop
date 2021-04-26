import React, { useState} from "react";
import styled from "styled-components";
import FindProductForm from "../components/FindProductForm";
import { useConfirmationDialog } from "../customHooks/confirmationDialogHook";
import axios from 'axios';
import {useGlobalContext} from '../context/global_context';
//import {useAxiosRequest} from '../customHooks/TESTaxiosRequest';

const DeleteProduct = () => {
    //const {execute, fetchedData, message} = useAxiosRequest();
    const {openModal, closeModal} = useGlobalContext();
    const [productId, setProductId] = useState("");
    
    const deleteProduct = async () => {
        closeModal();
        try {
            const {data} = await axios({
                url: `/allProducts/${productId}`,
                method: 'DELETE'
            });
            //console.log(data.message);
            openModal({showModal: true, modalMsg: data.message, modalError: false});
            
        } catch (err) {
            if (err.response) {
                openModal({showModal: true, modalMsg: err.response.data.message, modalError: true});
        
              } else {
                // u slucaju da nema mreze, a hocemo single product izbacuje Promise pending
                openModal({showModal: true, modalMsg: err.message, modalError: true});
              }
        }

        finally {
            setProductId('');
            closeDialog();
        }        
    }

    const { openDialog, closeDialog, Dialog } = useConfirmationDialog({
        headerText: 'brisanje', 
        bodyText: 'potvrdite brisanje proizvoda?', 
        handleConfirm: deleteProduct
    });

    const onSubmit = (e) => {
        e.preventDefault();
        openDialog();        
    }

    return (
        <Wrapper>
            <Dialog />
            <FindProductForm
                title='obriši proizvod'
                handleSubmit={onSubmit}
                findId={productId}
                setFindId={setProductId}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    border-radius: var(--radius);
    //margin: 1rem 0;
    min-height: 100%;
    position: relative;
    display: grid;
    place-items: center;
`;

export default DeleteProduct;
