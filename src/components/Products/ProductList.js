import React from 'react';
import Product from './Product'

const ProductList = ({title, products}) => {
    console.log(products);
    return (
        <div className="section">
            <h2 className="section-title">{title}</h2>
            <div className="products-center">
                {
                    products.map( item => <Product {...item} key={item.id} /> )
                }
            </div>
        </div>
    );
}

export default ProductList;
