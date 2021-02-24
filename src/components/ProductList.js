import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

  const { filteredProducts: products, gridView } = useFilterContext();

  if (gridView) {
    return <GridView products={products}/>
  }
  return <ListView />
}

export default ProductList
