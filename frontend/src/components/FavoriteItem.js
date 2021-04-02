import React from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import {formatPrice} from '../utils/helpers';
import {useProductsContext} from '../context/products_context';

const FavoriteItem = ({product}) => {
  const {name, images, price} = product;
  const {updateFavorites} = useProductsContext();

  const handleRemoveBtn = (e) => {
    e.preventDefault();
    updateFavorites(product);
  }
  return <Wrapper>
            <div className='title'>
                <img src={images} alt={name} />
                <div>
                    <h5>{name}</h5>
                    <p className='unit'>pakovanje: 100 gr</p>
                    <h5 className='price-small'>{formatPrice(price / 10)}</h5>
                </div>
            </div>

            <h5 className='price'>{formatPrice(price / 10)}</h5>

            <button className='remove-btn' onClick={handleRemoveBtn}>
                    <FaTrash />
            </button>
        </Wrapper>
}

const Wrapper = styled.article`
    display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 75px;
  gap: 1rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 3rem;

  &:hover {
    background-color: var(--clr-grey-10);
    cursor: pointer;
    border-radius: var(--radius);
  } 

  .title {
      justify-self: start;
      margin-left: 1rem;
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }

  h5 {
    font-size: 0.75rem;
    color: var(--clr-primary-5);
    margin-bottom: 0;
  }

  .unit {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    margin-bottom: 0;
  }

  .price {
      display: none;
    }

  .price-small {
    color: var(--clr-primary-5);
  }

  .remove-btn {
    justify-self: end;
    margin-right: 1rem;
    color: var(--clr-white);
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }

  @media (min-width: 776px) {
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-template-rows: 75px;

    .title {
        margin-left: 2.5rem;
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }

    img {
    height: 100%;
    }

    .price-small {
      display: none;
    }

    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }    

    .remove-btn {
        margin-right: 2.5rem;
    }
  }
`;

export default FavoriteItem;