

export const featuredProducts = (data)=>{
    return data.filter(item=>{
        return item.featured === true
    })
}