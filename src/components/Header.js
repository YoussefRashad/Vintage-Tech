import React from 'react';
import { Link } from 'react-router-dom'

import { UserContext } from '../context/user'

import Logo from '../assets/logo.svg'
import CartLink from './Cart/CartLink'
import LoginLink from './LoginLink';

const Header = () => {
    const { user } = React.useContext(UserContext)
    return (
        <header className="header">
            <img src={Logo} className="logo" alt="vintage tech logo" />
            <nav>
                <ul>
                    <div>
                        <li>
                            <Link to="/">
                                home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                about
                            </Link>
                        </li>
                        <li>
                            <Link to="/products">
                                products
                            </Link>
                        </li>
                        {
                            user.token &&

                            <li>
                                <Link to="/checkout">
                                    checkout
                                </Link>
                            </li>
                        }
                    </div>

                    <div>
                        <LoginLink />
                        <CartLink />
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
