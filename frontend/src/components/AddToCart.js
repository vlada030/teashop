import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'
import {formatPrice, priceCalculator} from '../utils/helpers'

const AddToCart = ({product}) => {
  const {id, package : unit, stock, price} = product;
  const {addToCart, cart} = useCartContext();

  const [weight, setWeight] = useState(parseInt(unit[0]));
  const [unitPrice, setUnitPrice] = useState(price/10);
  const [amount, setAmount] = useState(1);

  const handleUnit = ind => {
    setWeight(unit[ind]);
    setUnitPrice(priceCalculator(unit[ind], parseInt(price)));
    setAmount(1);
  }
  
  const productWeightInCart = cart.reduce((sum, item) => {
      if (item.id.startsWith(id)) {
          return sum + parseInt(item.unit) * parseInt(item.amount);
      }
      return sum;
  }, 0);

  //console.log({productWeightInCart, stock});

  const increaseBtn = () => {

    // proveri najpre tezinu u korpi

    setAmount(amount => {
      let tempAmount = amount + 1;
      if ( productWeightInCart + tempAmount * weight > stock ) {
        return amount;
      }

      return tempAmount;
    });
  }

  const decreaseBtn = () => {
      setAmount(amount => {
        let tempAmount = amount - 1;
        if (tempAmount < 1) {
          return amount;
        }

        return tempAmount;
      })
    }
 
  return (
      <Wrapper>
          <h5 className="price">{formatPrice(unitPrice)}</h5>

          <div className="units">
              <span> pakovanje (gr) : </span>
              <div>
                  {unit.map((item, index) => {
                      return (
                          <button
                              key={index}
                              className={
                                  item === weight.toString()
                                      ? "unit-btn active"
                                      : "unit-btn"
                              }
                              onClick={() => {
                                  handleUnit(index);
                              }}
                          >
                              {item}
                          </button>
                      );
                  })}
              </div>
          </div>
          {stock - productWeightInCart >= weight ? (
              <div className="btn-container">
                  <AmountButtons
                      amount={amount}
                      decreaseBtn={decreaseBtn}
                      increaseBtn={increaseBtn}
                  />

                  <Link
                      to="/cart"
                      className="btn"
                      onClick={() => {
                          addToCart(id, weight, unitPrice, amount, product);
                      }}
                  >
                      u korpu
                  </Link>
              </div>
          ) : (
              <p>Svi preostali proizvodi sa stanja su u Vašoj korpi</p>
          )}
      </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 2rem 0;
  
  h5 {
    margin-bottom: 2rem;
  }
  .units {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      font-weight: 700;
      &::first-letter {
        text-transform: capitalize;        
      }
    }
    div {
      display: flex;
    }
  }
  .unit-btn {
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background: var(--clr-primary-6);
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .active {
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 140px;
    text-align: center;
  }
`
export default AddToCart
