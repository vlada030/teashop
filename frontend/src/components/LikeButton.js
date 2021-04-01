import React from 'react';
import styled from 'styled-components';
import {GiHeartBeats} from 'react-icons/gi';

const LikedButton = ({arr, singleProduct, toggleLike, user}) => {
    const isLiked = arr.find(item => item.id === singleProduct.id);

    if (!user) {
        return <Wrapper>
                    <GiHeartBeats className={'disabled unlike'}/>
                    morate prvo da se ulogujete
                </Wrapper>
    }

    return (
        <Wrapper onClick={() => toggleLike(singleProduct)}>
            <GiHeartBeats className={`like-icon ${isLiked ? 'like' : 'unlike'}`}/>
            {isLiked ? "izbriši iz omiljenih" : "dodaj u omiljene"}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    display: block;
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    font-size: 1rem;
    color: var(--clr-grey-3);
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    &:hover .like-icon{
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

    .disabled {
        cursor: not-allowed;
    }
`;

export default LikedButton;