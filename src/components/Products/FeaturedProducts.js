import React from 'react';
import { ProductContext } from '../../context/products'
import ProductList from './ProductList'
import Loading from '../Loading'

const FeaturedProducts = () => {

    const { featured, loading } = React.useContext(ProductContext)
    if(loading){
        return <Loading />
    }
    return <ProductList products={featured} title="featured products" />
}

export default FeaturedProducts;
