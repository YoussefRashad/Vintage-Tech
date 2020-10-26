import React from 'react'
import { useHistory } from 'react-router-dom'
// Context
import { UserContext } from '../context/user'
import { CartContext } from '../context/cart'
// Component
import EmptyCart from '../components/Cart/EmptyCart'
// Strapi
import submitOrder from '../strapi/submitOrder'
// Stripe
import {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe
} from "react-stripe-elements";

function Checkout(props) {
    const history = useHistory()
    const { user, alert, showAlert, hideAlert } = React.useContext(UserContext)
    const { cart, total, clearCart } = React.useContext(CartContext)

    const [name, setName] = React.useState('')
    const [error, setError] = React.useState('')

    const isEmpty = !name || alert.show

    const handleSubmit = async (e)=>{
        e.preventDefault()
        showAlert({ msg: "submitting order... please wait" })
        const response = await props.stripe.createToken().catch(error => console.log(error))
        const {token} = response

        if(token){
            setError('')
            const {id} = token

            const order = await submitOrder({ name, total, items: cart, stripeTokenID: id, userToken: user.token})

            if(order){
                showAlert({ msg: "your order is complete" });
                clearCart();
                history.push("/");
                return;
            }else{
                showAlert({
                    msg: "there was an error with your order. please try again!",
                    type: "danger"
                });
            }
        } else {
            hideAlert();
            setError(response.error.message);
        }
    }

    if (cart.length < 1) return <EmptyCart />;

    return (
        <section className="section form">
            <h2 className="section-title">Checkout</h2>
            <form className="checkout-form">
                <h3>
                    order total : <span>${total}</span>
                </h3>
                {/* single input */}
                <div className="form-control">
                    <label htmlFor="name">name</label>
                    <input 
                        type="text"   
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                {/* End of single input */}

                {/* card element */}
                <div className="stripe-input">
                    <label htmlFor="card-element">credit or debit card</label>
                    <p className="stripe-info">
                        Test using this credit card : <span>4242 4242 4242 4242</span>
                        <br />
                        enter any 5 digits for the zip code
                        <br />
                        enter any 3 digits for the CVC
                    </p>
                </div>
                <CardElement className="card-element"></CardElement>
                {/* end of card element */}
                {error && <p className="form-empty">{error}</p>}
                {isEmpty ? (
                    <p className="form-empty">please fill out name field</p>
                ) : (
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary btn-block"
                        >
                            submit
                        </button>
                    )}
            </form>
        </section>
    )
}

const CardForm = injectStripe(Checkout)

const StripeWrapper = ()=>{
    return(
        <StripeProvider apiKey="pk_test_51HfC2CElpxRPdVDWE4le3hmIJqP2ndakRJmbZxmgEdnS4Kd7UkMMvsLOSHeNQY5oU5HstPTUhS7CuxwldjF3x7OK00myK5FXvu">
            <Elements>
                <CardForm></CardForm>
            </Elements>
        </StripeProvider>
    );
}

export default StripeWrapper
