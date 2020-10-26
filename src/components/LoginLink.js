import React from 'react';
import { Link, useHistory } from 'react-router-dom'
// context 
import { UserContext } from '../context/user'
import { CartContext } from '../context/cart'

const LoginLink = () => {
    const { user, userLogout } = React.useContext(UserContext)
    const { clearCart } = React.useContext(CartContext)
    const history = useHistory()

    if(user.token){
        return (
            <button
                className="login-btn"
                onClick={()=> {
                    userLogout()
                    clearCart()
                    history.push('/login')
                }}
                
            >logout</button>
        );
    }
    
    return <Link to="/login">login</Link>
}

export default LoginLink;
