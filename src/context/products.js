import React, { useState, useEffect } from 'react'
import axios from 'axios'
import localProducts from '../utils/localProducts'
import {featuredProducts} from '../utils/helpers'
export const ProductContext = React.createContext()

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        /*
            axios
        */
        
        const products = localProducts
        setProducts(products)
        const featured = featuredProducts(products)
        setFeatured(featured)
        console.log(products);

        setLoading(false)
        return () => {}
    }, [])

    return (
        <ProductContext.Provider 
            value={{
                products, 
                featured, 
                loading
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}