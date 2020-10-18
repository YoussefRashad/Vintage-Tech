import React from 'react'
// import localCart from '../utils/localCart'

export const CartContext = React.createContext()

function getCartfromLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export default function CartProvider({ children }) {
    const [cart, setCart] = React.useState(getCartfromLocalStorage())
    const [cartItems, setCartItems] = React.useState(0)
    const [total, setTotal] = React.useState(0)

    React.useEffect(()=>{
        // local storage
        localStorage.setItem('cart', JSON.stringify(cart))
        // cart items
        let newCartItems = cart.reduce((total, cartItem)=>{
            return total += cartItem.amount
        },0)
        setCartItems(newCartItems)
        // cart total
        let newTotal = cart.reduce((total, cartItem)=>{
            return total += cartItem.amount * cartItem.price
        },0)
        newTotal = parseFloat(newTotal.toFixed(2))
        setTotal(newTotal)
    }, [cart])

    const increaseAmount = (ID) => {
        let newCart = [...cart].map(item=>{
            return item.id === ID ? { ...item, amount: ++item.amount} : { ...item }
        })
        setCart(newCart)
    }
    const decreaseAmount = (ID, Amount)=>{
        if(Amount === 1){
            removeItem(ID)
            return;
        }else{
            let newCart = [...cart].map(item =>{
                return item.id === ID ? { ...item, amount: --item.amount } : { ...item }
            })
            setCart(newCart)
        }
    }
    const removeItem = (ID) => {
        let newCart = [...cart].filter(item => item.id !== ID)
        setCart(newCart)
    }
    const addToCart = (product) => {
        // setCart([ ...cart, product ])
        let item = [...cart].find(item => item.id === product.id)
        if(item){
            increaseAmount(product.id)
            return;
        }else{
            const newProduct = { ...product, amount: 1}
            setCart([...cart, newProduct])
        }
    }
    const clearCart = () =>{
        setCart([])
    }

    return (
        <CartContext.Provider value={{
            cart,
            cartItems,
            total,
            increaseAmount,
            decreaseAmount,
            removeItem,
            addToCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
