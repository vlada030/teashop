import React from 'react'
import styled from 'styled-components'
import {useProductsContext} from '../context/products_context';

const Error = () => {

  const { errorMsg } = useProductsContext();

  return <Wrapper className='section section-center text-center'>
    <h3>{errorMsg ? `Greška : ${errorMsg}` : 'došlo je do greške...'}</h3>
  </Wrapper>
}

const Wrapper = styled.div`
  h2 {
    text-transform: none
  }
`

export default Error
