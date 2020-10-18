import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import localProducts from '../utils/localProducts'
import { featuredProducts, flattenProducts } from '../utils/helpers'
import URL from '../utils/URL'

export const ProductContext = React.createContext()

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        axios.get(`${URL}/products`).then(response =>{
            console.log(response.data);
            const { data } = response
            setProducts(flattenProducts(data))
            const featured = featuredProducts(flattenProducts(data))
            setFeatured(featured)
            setLoading(false)
        })
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