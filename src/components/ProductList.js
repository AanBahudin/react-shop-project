import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

  const {filtered_products, grid} = useFilterContext()

  if(filtered_products.length < 1) {
    return (
      <h5 style={{textTransform: 'none'}}>
        Sorry, no products matched your search
      </h5>
    )
  }

  return (
    <div>
      {grid === false ? <GridView products={filtered_products}/> : <ListView products={filtered_products} /> }

    </div>
  )
}

export default ProductList
