import React from 'react';
import style from 'styled-components';
import {PageHero, FavoritesContent} from '../components';

const FavoriteProducts = () => {
    return <Wrapper className='page'>
                <PageHero title='omiljeni'/>
                <div className=' page'>
                    <FavoritesContent />
                </div>
            </Wrapper>
}

const Wrapper = style.main`

`;

export default FavoriteProducts;