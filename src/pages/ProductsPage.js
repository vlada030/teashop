import React from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort, PageHero, Pagination } from '../components'

const ProductsPage = () => {
  return <main>
          <PageHero title='Proizvodi' />
          <Wrapper className='page'>
            <div className='section-center products'>
              <Filters />
              <div>
                <Sort />
                <ProductList />
                <Pagination />
              </div>
            </div>

          </Wrapper>
        </main>
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
