import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'

const Sort = () => {

  const {filteredProducts:products, gridView, setGridView, setListView, sort, updateSort} = useFilterContext();

  return <Wrapper>
          <div className='btn-container'>
            <button className={gridView ? 'active' : null} onClick={() => setGridView()}>
              <BsFillGridFill />
            </button>
            <button className={!gridView ? 'active' : null} onClick={() => setListView()}>
              <BsList />
            </button>
          </div>
          <p>ukupno pronađeno : {products.length}</p>
          <hr />
          <form value={sort} onChange={updateSort}>
            <label htmlFor='sort'>sortiraj po</label>
            <select name='sort' id='sort' className='sort-input'>
              <option value='price-lowest'>ceni (najniža)</option>
              <option value='price-highest'>ceni (najviša)</option>
              <option value='name-a'>nazivu (a-š)</option>
              <option value='name-z'>nazivu (š-a)</option>
            </select>
          </form>
        </Wrapper>
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  
  p {
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    /* text-transform: capitalize; */
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    padding: 0.25rem 0.5rem 0.25rem 0.85rem;
  }
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      /* margin-right: 0.5rem; */
      padding: 0;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
`

export default Sort
