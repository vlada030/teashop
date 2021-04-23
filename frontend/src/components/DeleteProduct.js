import React, { useState } from "react";
import styled from "styled-components";
import FindProductForm from "../components/FindProductForm";
import { useConfirmationDialog } from "../customHooks/confirmationDialogHook";

const DeleteProduct = () => {

    const [productId, setProductId] = useState("");
    
    const { openModal, closeModal, Dialog } = useConfirmationDialog({
        headerText: 'brisanje', 
        bodyText: 'potvrdite brisanje proizvoda?', 
        handleConfirm: () => {
            console.log(`DOKUMENT ${productId} OBRISAN`);
            setProductId('');
            closeModal();
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        openModal();        
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
