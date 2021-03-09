import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

  const { paginatedProducts, gridView, page } = useFilterContext();

  let products = [];

  // prosledi direktno elemente na strani
  if (paginatedProducts.length > 0) {
    //console.log({paginatedProducts, page});
    products = paginatedProducts[page];
  }
  
  if (products.length < 1) {
    return <h5>Vaš kriterijum pretrage nije pronašao nijedan proizvod...</h5>
  }

  if (gridView) {
    return <GridView products={products}/>
  }

  return <ListView products={products}/>
}

export default ProductList
