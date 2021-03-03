import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import {BsQuestionCircleFill} from 'react-icons/bs'

const CartTotals = () => {

  const {totalAmount, shipping} = useCartContext();
  const updatedShipping = totalAmount > 3000 ? 0 : shipping;
  return (
      <Wrapper>
          <div>
              <article>
                  <h5 className="format">
                      suma :<span>{formatPrice(totalAmount)}</span>
                  </h5>

                  <div className="format">
                      poštarina :
                      <p>
                        <span>{formatPrice(updatedShipping)}</span>
                        <span>
                            <BsQuestionCircleFill />
                        </span>
                      </p>
                  </div>

                  <p className="info">
                      za iznose preko 3000 RSD poštarina je besplatna
                  </p>

                  <hr />

                  <h4 className="format">
                      ukupno :
                      <span>{formatPrice(totalAmount + updatedShipping)}</span>
                  </h4>
              </article>
              <Link to="/checkout" className="btn">
                  kasa
              </Link>
          </div>
      </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  .format {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  .info {
    opacity: 0;
    transition: var(--transition);
    margin: 0.6rem 0;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  div.format p {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    align-items: start;
    margin: 0;
    
    span {
      display: inline-block;
      /* margin: 0 1rem; */
    }
  }

  div.format:hover + .info {
    opacity: 1;
  }  

  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
