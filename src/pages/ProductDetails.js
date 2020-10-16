import React from 'react';
import { useParams, useHistory } from 'react-router-dom'
import Loading from '../components/Loading';
import { ProductContext } from '../context/products'
import { CartContext } from '../context/cart'

const ProductDetails = () => {
    const history = useHistory()
    const { id } = useParams()

    const { products } = React.useContext(ProductContext)
    const { addToCart } = React.useContext(CartContext)

    const product = products.find(item =>item.id === +id)
    if(products.length === 0){
        return <Loading />
    }else{
        const {
            title,
            price,
            image,
            description
        } = product

        return (
            <section className="single-product">
                <img src={image} alt={title} className="single-product-image" />
                <article>
                    <div>
                        <h1>{title}</h1>
                        <h2>${price}</h2>
                        <p>{description}</p>
                    </div>
                    <button 
                        className="btn btn-primary btn-block"
                        onClick={()=>{
                            addToCart(product)
                            history.push('/cart')
                        }}
                    >
                        add to cart
                    </button>
                </article>
            </section>
        );
    }
}

export default ProductDetails;
