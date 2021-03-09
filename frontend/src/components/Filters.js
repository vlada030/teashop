import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'

const Filters = () => {
  const {
      filter: { text, category, illness, unit, maxPrice, minPrice, price },
      updateFilters,
      clearFilters,
      allProducts
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, 'category');
  const deceases = getUniqueValues(allProducts, 'filter');
  const units = getUniqueValues(allProducts, 'package');

  return (
      <Wrapper>
          <div className="content">
              <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-control">
                      <input
                          type="text"
                          className="search-input"
                          name="text"
                          placeholder="pretraga"
                          value={text}
                          onChange={updateFilters}
                      />
                  </div>

                  <div className="form-control">
                      <h5>vrste</h5>
                      {categories.map((name, index) => {
                          return (
                              <button
                                  key={index}
                                  className={`${
                                      category === name
                                          ? "cat-btn cat-btn-active"
                                          : "cat-btn"
                                  }`}
                                  name="category"
                                  onClick={updateFilters}
                              >
                                  {name}
                              </button>
                          );
                      })}
                  </div>

                  <div className="form-control">
                      <h5>simptomi</h5>
                      <select
                          className="deceases"
                          name="illness"
                          value={illness}
                          onChange={updateFilters}
                      >
                          {deceases.map((dec, index) => {
                              return (
                                  <option key={index} value={dec}>
                                      {dec}
                                  </option>
                              );
                          })}
                      </select>
                  </div>

                  <div className="form-control">
                      <h5>pakovanje</h5>
                      <div className="units">
                          {units.map((pack, index) => {
                              return (
                                  <button
                                      key={index}
                                      className={`${
                                          pack === unit
                                              ? "unit-btn unit-btn-active"
                                              : "unit-btn"
                                      }`}
                                      name="unit"
                                      onClick={updateFilters}
                                  >
                                      {pack}
                                  </button>
                              );
                          })}
                      </div>
                  </div>

                  <div className="form-control">
                      <h5>cena</h5>
                      <p>{formatPrice(price)}</p>
                      <input
                          type="range"
                          name="price"
                          onChange={updateFilters}
                          min={minPrice}
                          max={maxPrice}
                          value={price}
                          step='100'
                      />
                  </div>

                  <button className='clear-btn' onClick={clearFilters}>
                    obriši filtere
                  </button>
              </form>
          </div>
      </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
      text-transform: capitalize;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  .cat-btn {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .cat-btn-active {
    border-color: var(--clr-grey-5);
  }
  .deceases {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    color: inherit;
  }
  .units {
    display: flex;
    align-items: center;
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

  .unit-btn-active {
    color: var(--clr-primary-10);
    opacity: 1;

  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    box-shadow: var(--lightShadow);
    
  }

  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
