import React, {useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from "react-icons/ai";
import {useGlobalContext} from '../context/global_context';


const Modal = () => {
    const {showModal, modalError, modalMsg, closeModal} = useGlobalContext();
    //console.log('MODAL RERENDERED');
    // ugasi samo info poruku, ne error    
    useEffect(() => {
        if (!modalError) {
                setTimeout(() => {
                    closeModal();
                }, 3000);
            }
        }, [modalError, closeModal]);

    return (
        <React.Fragment>
            {showModal ? (
                <Wrapper className={modalError ? "error" : "success"}>
                    <p>{modalMsg}</p>
                    <AiOutlineCloseCircle onClick={closeModal} />
                </Wrapper>
            ) : null}
        </React.Fragment>
    );   
}

const Wrapper = styled.div`
    position: fixed;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    padding: .5rem .75rem;
    border-radius: var(--radius);
    /* display: flex;
    align-items: center;
    justify-content: center; */
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;

    width: 90vw;
    max-width: var(--fixed-width);
    margin: 0 auto;

    z-index: 20;

    p {
        margin-bottom: 0;
        margin-right: 2rem;
    }

    svg {
        height: 20px;
        width: 20px;
        cursor: pointer;
        color: inherit;
        justify-self: end;
    }
`;

 export default Modal;