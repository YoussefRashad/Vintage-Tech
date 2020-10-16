import React from 'react';
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cart'
import EmptyCart from '../components/Cart/EmptyCart'
import CartItem from '../components/Cart/CartItem';

const Cart = () => {
    const { cart, total } = React.useContext(CartContext)
    const user = false
    if(cart.length === 0){
        return <EmptyCart />
    }
    return (
        <section className="section">
            <h1 className="section-title">your cart</h1>
            <div className="cart-items">
                {
                    cart.map(item => <CartItem {...item} key={item.id} />)
                }
                <h2>total : $ {total}</h2>
                {
                    user ?
                        <Link to="/checkout" className="btn btn-primary btn-block">
                            checkout
                        </Link>
                    :
                        <Link to="/login" className="btn btn-primary btn-block">
                            login
                        </Link>
                }
            </div>
        </section>
    );
}

export default Cart;
