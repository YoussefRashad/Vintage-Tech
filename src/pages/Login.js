import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/user'
import loginUser from '../strapi/loginUser'
import registerUser from '../strapi/registerUser'

const Login = () => {
    const { userLogin, alert, showAlert } = React.useContext(UserContext)

    const [isMember, setIsMember] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('default')

    const history = useHistory()

    const isEmpty = !email || !password || !username || alert.show

    const toggleMember = ()=>{
        setIsMember((prevMember)=>{
            const isMember = !prevMember
            isMember ? setUsername('default') : setUsername('')
            return isMember;
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        showAlert({
            msg: "accessing user data. please wait..."
        })

        let response;
        if(isMember){
            response = await loginUser({ email, password })
        }else{
            response = await registerUser({ email, password, username })
        }

        if(response){
            const {
                jwt: token,
                user: { username }
            } = response.data;
            const newUser = { username, token }
            userLogin(newUser)
            showAlert({
                msg: `you are logged in : ${username}. shop away my friend`
            })
            history.push('/products')
        }else{
            showAlert({
                msg: "there was an error. please try again...",
                type: "danger"
            })
        }
    }

    return (
        <section className="section form">
            <h2 className="section-title"> {isMember ? 'sign in' : 'register'}</h2>
            <form className="login-form">
                {/* Single Input */}
                <div className="form-control">
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                {/* End of Single Input */}
                {/* Single Input */}
                <div className="form-control">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* End of Single Input */}
                {/* Single Input */}
                { !isMember && 
                    <div className="form-control">
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                }
                {/* End of Single Input */}
                {/* empty form text */}
                { 
                    isEmpty && <p className="form-empty">please fill out all form fields</p>
                }
                {/* submit btn */}
                { !isEmpty && 
                    <button
                        type="submit"
                        className="btn btn-block btn-primary"
                        onClick={handleSubmit}
                    >
                        submit
                    </button>
                }
                {/* register link */}
                <p className="register-link">
                    {isMember ? "need to register" : "already a member"}
                    <button type="button" onClick={toggleMember}>
                        click here
                    </button>
                </p>
            </form>
        </section>
    );
}

export default Login;
