import React, {useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({type, handleClose}) => {

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        }, 2000)
    }, []);

    return <Wrapper className={type ? 'success' : 'error'}>
                <p>Ovo je modal bla bla blal abla</p>
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
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin-bottom: 0;
        margin-right: 2rem;
    }

    svg {
        height: 20px;
        width: 20px;
        cursor: pointer;
        color: inherit;
    }
`;

 export default Modal;