import React, {useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({type, handleClose, message}) => {

    // ugasi samo info poruku, ne error    
    useEffect(() => {
        if (!type) {
                setTimeout(() => {
                    handleClose();
                }, 3000);
            }
        }, [type]);

    return <Wrapper className={type ? 'error' : 'success'}>
                <p>{message}</p>
                <AiOutlineCloseCircle onClick={handleClose}/>
            </Wrapper>
}

const Wrapper = styled.div`
    position: absolute;
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