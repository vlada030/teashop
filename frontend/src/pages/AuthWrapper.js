import React from 'react'
import styled from 'styled-components'
import {Loading} from '../components'
import {useUserContext} from '../context/user_context';

// mora da sa uvede ova komponenta jer iako je user logovan kada se ide direktno na /checkout OPET VRACA na pocetnu
const AuthWrapper = ({children}) => {

  // const {isLoading, error} = useUserContext();

  // if (isLoading) {
  //   return <Wrapper>
  //           <Loading/>
  //         </Wrapper>
  // }

  // if (error) {
  //   return <Wrapper>
  //           {error.message}
  //         </Wrapper>
  // }

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
