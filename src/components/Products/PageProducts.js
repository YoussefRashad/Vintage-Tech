import React from 'react';
import { ProductContext } from '../../context/products'
import ProductList from './ProductList';

const PageProducts = () => {
    const { products } = React.useContext(ProductContext)

    return <ProductList title="our products" products={products} />
}

export default PageProducts;
