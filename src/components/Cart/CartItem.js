import React from 'react';
import { FaAngleUp, FaAngleDown} from 'react-icons/fa'
import { CartContext } from '../../context/cart'

const CartItem = ({ id, title, price, image, amount }) => {
    const { increaseAmount, decreaseAmount, removeItem } = React.useContext(CartContext)
    return (
        <article className="cart-item">
            <img src={image} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4>${price}</h4>
                <button 
                    className="cart-btn remove-btn"
                    onClick={()=> removeItem(id)}
                >
                    remove
                </button>

            </div>
            <div>
                <button
                    className="cart-btn amount-btn"
                    onClick={()=> increaseAmount(id)}
                >
                    <FaAngleUp />
                </button>
                <p className="item-amount">{amount}</p>
                <button
                    className="cart-btn amount-btn"
                    onClick={()=> decreaseAmount(id, amount)}
                >
                    <FaAngleDown />
                </button>
            </div>
        </article>
    );
}

export default CartItem;
