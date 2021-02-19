import React from 'react'
import styled from 'styled-components'

const Error = () => {
  return <Wrapper className='section section-center text-center'>
    <h2>došlo je do greške...</h2>
  </Wrapper>
}

const Wrapper = styled.div`
  h2 {
    text-transform: none
  }
`

export default Error
