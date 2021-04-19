import React from 'react';
import { SiGitea } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global_context';
import styled from 'styled-components';

const Logo = () => {
    const {openSidebar} = useGlobalContext();

    return (
        <Wrapper>
            <Link to='/' className='logo'>
            {/* <img src={logo} alt='tea' /> */}
            tea shop
            </Link>
            <button type='button' className='nav-toggle' onClick={openSidebar}>
            <SiGitea />
            </button>
        </Wrapper>
    ) 
}

const Wrapper = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* img {
      width: 175px;
      margin-left: -15px;
      scale: 1;
      transition: var(--transition);
      &:hover {
        scale: 1.05;
      }
    } */
    .logo {
        font-size: 2.5rem;
        color: var(--clr-primary-5);
        //font-weight: 600;
        letter-spacing: var(--spacing);
        text-shadow: 2px 2px 5px var(--clr-primary-5);
        text-transform: capitalize;
        font-style: italic;
        transition: var(--transition);

        &:hover {
          text-shadow: 3px 3px 8px var(--clr-primary-5);
        }
      }
  
`;


export default Logo;