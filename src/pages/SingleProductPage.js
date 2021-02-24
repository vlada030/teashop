import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {GiFeather, GiTeapotLeaves, GiHeartPlus, GiHealing, GiHeartMinus, GiHalt} from 'react-icons/gi'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {

  const {
      singleProductLoading,
      singleProductError,
      singleProduct,
      fetchSingleProduct,
  } = useProductsContext();

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  // u slucaju greske nakon 3 sekunde uradi redirekciju
  useEffect(() => {
    if (singleProductError) {
      
      setTimeout(() => {
        history.push('/');
      }, 3000)
    }
  }, [singleProductError]);

  if (singleProductLoading) {
    return <div className='section section-center page'>
            <Loading />
          </div>
  }

  if (singleProductError) {
    return <div className='section section-center page'>
            <Error />
          </div>
  }

  const {id: productCode, name, price, description, goal, disclaimer, preparation, images, reviews, stars, stock, filter, category, package:unit} = singleProduct;
  return <Wrapper>
          <PageHero title={name} product/>
          <div className='section section-center page'>
            <Link to='/products' className='btn'>Nazad na proizvode</Link> 
            <div className='product-center'>
              <ProductImages images={images} />

              <section className='content'>
                <h2>{name}</h2>
                <Stars stars={stars} reviews={reviews}/>
                <h5 className='price'>{formatPrice(price)}</h5>
                <p className='info'>
                  <span>Dostupnost :</span>
                  {stock > 0 ? 'na stanju' : 'nestalo'}
                </p>

                {stock > 0 && <AddToCart product={singleProduct}/>}
                
                <hr />

                <div className='desc-container'>
                  <GiFeather />
                  <p className='desc'>{description}</p>
                </div>
                <div className='desc-container'>
                  <GiHealing />
                  <p className='desc'>{goal}</p>
                </div>
                <div className='desc-container'>
                  <GiTeapotLeaves />
                  <p className='desc'>{preparation}</p>
                </div>
                <div className='desc-container'>
                  <GiHalt />
                  <p className='desc'>{disclaimer}</p>
                </div>
              </section>
            </div>
          </div>
        </Wrapper>
}

const Wrapper = styled.main`
  h2 {
    text-transform: capitalize;
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }

  .desc-container {
    display: grid;
    //grid-template-columns: auto 1fr;
    //justify-items: center;
    margin-bottom: 1.25rem;

    .desc {
      line-height: 2;
      max-width: 45em;
      text-indent: 10px;
    }

    svg {
      margin-bottom: 1.25rem;
      font-size: 1.5rem;
      color: var(--clr-primary-5);
    }
  }
  .info {
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;

    /* &::first-letter {
        text-transform: capitalize;
      } */
    
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
  }

  hr {
    margin-bottom: 2rem;
  }

  @media (min-width: 800px) {
    .desc-container {
      svg {
        font-size: 2rem;
      }
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: top;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
