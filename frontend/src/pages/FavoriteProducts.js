import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {PageHero, FavoritesContent} from '../components';
import {useUserContext} from '../context/user_context';

const FavoriteProducts = () => {

    const {user} = useUserContext();

    if (user && user.favorites.length < 1) {
        return <Wrapper className='page-100'>
                <div className='empty'>
                  <h2>vaša lista omiljenih proizvoda je prazna</h2>
                  <Link to='/products' className='btn'>dodajte proizvode</Link>
                </div>
              </Wrapper>
      }

    return <Wrapper className='page'>
                <PageHero title='omiljeni'/>
                <div className=' page'>
                    <FavoritesContent />
                </div>
            </Wrapper>
}

const Wrapper = styled.main`
    .empty {
        text-align: center;
        
        h2 {
            margin-bottom: 3rem;
        }
    }
`;

export default FavoriteProducts;