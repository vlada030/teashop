import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {
  const {package : unit, stock} = product;

  const [weight, setWeight] = useState(unit[0]);
  const [amount, setAmount] = useState(1);

  const handleUnit = ind => {
    setWeight(unit[ind]);
  }

  const increaseBtn = () => {
    setAmount(amount => {
      let tempAmount = amount + 1;
      if (tempAmount > stock) {
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
 
  return <Wrapper>
          <div className='units'>
            <span> pakovanje (gr) : </span>
            <div>{unit.map((item, index) => {
              return (
                  <button key={index} className={item === weight ? 'unit-btn active' : 'unit-btn'} onClick={() => {handleUnit(index)}}>
                      {item}
                  </button>
              );   
            })}
            </div>
          </div>
          <div className='btn-container'>
            <AmountButtons amount={amount} decreaseBtn={decreaseBtn} increaseBtn={increaseBtn} />
            <Link to='cart' className='btn'>u korpu</Link>
          </div>
        </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
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
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
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
