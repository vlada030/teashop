import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import {Loading} from '../components'

// mora da sa uvede ova komponenta jer iako je user logovan kada se ide direktno na /checkout OPET VRACA na pocetnu
const AuthWrapper = ({children}) => {

  const {isLoading, error} = useAuth0();

  if (isLoading) {
    return <Wrapper>
            <Loading/>
          </Wrapper>
  }

  if (error) {
    return <Wrapper>
            {error.message}
          </Wrapper>
  }

  return <React.Fragment>
          {children}
        </React.Fragment>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
