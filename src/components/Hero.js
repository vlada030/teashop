import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroTea1 from '../assets/tea-1.jpg'
import heroTea2 from '../assets/tea-5.jpg'

const Hero = () => {
  return <Wrapper className='section section-center'>
          <article className='content'>
            <h1>Naručite Vaše <br />omiljene čajeve</h1>
            <p>Nestao Vam je čaj u teglici? Danima zaboravljate i nemate vremena da odete do prodavnice? Zašto ne biste odmah poručili i preuzeli na kućnoj adresi!</p>
            <Link to='/products' className='btn hero-btn'>poruči odmah</Link>
          </article>
          <article className='img-container'>
            <img src={heroTea1} alt='tea-1' className='main-img' />
            <img src={heroTea2} alt='tea-2' className='secondary-img' />
          </article>
        </Wrapper>
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    /* height: calc(100vh - 5rem); */
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .secondary-img {
      position: absolute;
      bottom: -4rem;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      bottom: 0%;
      left: -8%;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      border-radius: var(--radius);
    }
    .img-container::after {
      content: '';
      position: absolute;
      bottom: -20px;
      right: -10px;
      width: 40%;
      height: 8%;
      background: var(--clr-primary-9);
      border-radius: var(--radius);
      z-index: -2;
    }
  }
`

export default Hero
