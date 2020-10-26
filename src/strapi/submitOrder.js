
import axios from 'axios'
import URL from '../utils/URL'

const submitOrder = async ({ name, total, items, stripeTokenID, userToken})=>{
    const response = await axios.post(`${URL}/orders`,{
        name, total, items, stripeTokenID
    },{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }).catch(error => console.log(error))

    return response
}

export default submitOrder;