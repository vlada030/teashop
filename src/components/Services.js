import React from 'react'
import styled from 'styled-components'
import { benefits } from '../utils/constants'

const Services = () => {
  return <Wrapper>
            <div className='section-center'>
              <article className='header'>
                <h3>Zašto je dobro <br/> piti čaj</h3>
                <p>Sigurno ste već mnogо puta slušali o tome koliko su čajevi zdravi, ali dobro je da znate da ima još mnogo koristi, koje vam donosi zdrava navika ispijanja čaja. Piti čaj svakog dana, znači pustiti zdravlje u svoj život, oplemeniti svoj duh i telo, biti u miru sa samim sobom. U našim čajevima krije se čitava lepeza blagodeti koje vam pružaju njihovi sastojci. </p>
              </article>
              <div className='benefits-center'>
                {benefits.map(({id, icon, title, text}) => {
                  return <article key={id} className='benefit'>
                    <span className='icon'>{icon}</span>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </article>
                })}
              </div>
            </div>
        </Wrapper>
}

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;
  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
    text-transform: none;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
    text-indent: 20px;
  }
  .benefits-center {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
  }
  .benefit {
    background: var(--clr-primary-7);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
      text-indent: 0;
    }
  }
  .icon {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 2rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }

  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    .header h3 {
      text-align: center;
    }
  }

  @media (min-width: 576px) {
    .benefits-center {
      
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`
export default Services
