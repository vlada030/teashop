import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import {about} from '../utils/constants'

const HelperPage = ({about}) => {
  return (
      <main>
          <PageHero title="Uvod" />
          {about.map(({ id, title, img, text }) => {
              return (
                  <Wrapper key={id} className="section section-center">
                      <img src={img} alt={title} />
                      <article>
                          <div className="title">
                              <h3>{title}</h3>
                              <div className="underline"></div>
                          </div>
                          <p>{text}</p>
                      </article>
                  </Wrapper>
              );
          })}
      </main>
  );
}

const AboutPage = () => {
  return (<HelperPage about={about}/>)
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    white-space: pre-wrap;
    text-indent: 20px;
  }
  .title {
    text-align: left;
    h3::first-letter {
      text-transform: capitalize;
    }
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
