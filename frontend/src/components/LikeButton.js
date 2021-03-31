import React from 'react';
import styled from 'styled-components';
import {GiHeartBeats} from 'react-icons/gi';

const LikedButton = ({arr, id, toggleLike}) => {
    const isLiked = arr.includes(id);
    return (
        <Wrapper onClick={() => toggleLike(id)}>
            <GiHeartBeats className={isLiked ? 'like' : 'unlike'}/>
            {isLiked ? "izbriši iz omiljenih" : "dodaj u omiljene"}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    display: block;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    color: var(--clr-grey-3);
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    &:hover svg{
        opacity: 1;
    }
    
    svg {
        font-size: 2.5rem;
        color: var(--clr-primary-5);
        margin-right: 1rem;
        opacity: .5;
        transition: var(--transition);
    }

    .like {
        opacity: 1;
    }

    .unlike {
        opacity: .5;
    }
`;

export default LikedButton;