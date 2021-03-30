import React from 'react';
import styled from 'styled-components';
import {PageHero, FavoritesContent} from '../components';

const FavoriteProducts = () => {
    return <Wrapper className='page'>
                <PageHero title='omiljeni'/>
                <div className=' page'>
                    <FavoritesContent />
                </div>
            </Wrapper>
}

const Wrapper = styled.main`

`;

export default FavoriteProducts;