import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

  const { filteredProducts: products, gridView } = useFilterContext();

  if (products.length < 1) {
    return <h5>Vaš kriterijum pretrage nije pronašao nijedan proizvod...</h5>
  }

  if (gridView) {
    return <GridView products={products}/>
  }

  return <ListView products={products}/>
}

export default ProductList
