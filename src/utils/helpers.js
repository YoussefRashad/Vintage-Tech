
import URL from './URL'

export const featuredProducts = (data)=>{
    return data.filter(item=>{
        return item.featured === true
    })
}

export const flattenProducts = (data)=>{
    return data.map(item =>{
        const image = `${URL}${item.image.url}`
        return { ...item, image }
    })
}