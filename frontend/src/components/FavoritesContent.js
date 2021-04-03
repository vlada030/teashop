import React from 'react';
import styled from 'styled-components';
import FavoriteItem from './FavoriteItem';
import {Link} from 'react-router-dom';
import {useUserContext} from '../context/user_context';

const FavoritesContent = () => {

  const {user, clearFavoritesList} = useUserContext();

  return <Wrapper className="section section-center">

              {user.favorites.map(item => {
                  let {id} = item;
                  return <Link to={`/products/${id}`} key={id}>
                              <FavoriteItem key={id} product={item}/>
                          </Link>
              }) }

              <div className='link-container'>
                  <Link to='/products' className='link-btn'>
                  svi proizvodi
                  </Link>
                  <button className='link-btn clear-btn' onClick={() => {clearFavoritesList()}}>
                  isprazni listu
                  </button>
              </div>

          </Wrapper>;
}

const Wrapper = styled.section`
    .link-container {
    display: flex;
    justify-content: space-around;
    padding: 4rem 0;
  }

  .link-btn {
    background: var(--clr-primary-5);
    border: 2px solid transparent;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
    transition: var(--transition);
  }

  .link-btn:hover {
    color: var(--clr-primary-7)
  }

  .clear-btn {
    background: var(--clr-primary-1);
  }
`;

export default FavoritesContent;