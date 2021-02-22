import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({images = []}) => {
  const [mainImg, setMainImg] = useState(images[0]);

  const handleMainImage = (ind) => {setMainImg(images[ind])}

  return <Wrapper>
          <img src={mainImg} alt='img-main' className='main' />
          <div className='gallery'>
            {images.map((link, index) => {
              return (
                  <img
                      key={index}
                      src={link}
                      alt={`img-${index + 1}`}
                      onClick={() => handleMainImage(index)}
                      className={link === mainImg ? 'active' : null}
                  />
              ); 
            })}
          </div>
        </Wrapper>
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
    box-shadow: var(--dark-shadow)
  }
  .gallery {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
