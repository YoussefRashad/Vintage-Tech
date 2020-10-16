import React from 'react';
import Loading from '../components/Loading';
import PageProducts from '../components/Products/PageProducts'
import { ProductContext } from '../context/products'
const Products = () => {
    const { loading } = React.useContext(ProductContext)

    if(loading.show){
        return <Loading />
    }
    return (
        <>
            <PageProducts />
        </>
    );
}

export default Products;
