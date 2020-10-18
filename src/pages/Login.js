import React, { useState } from 'react';

const Login = () => {
    const [isMember, setIsMember] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('default')

    const isEmpty = !email || !password || !username

    const toggleMember = ()=>{
        setIsMember((prevMember)=>{
            const isMember = !prevMember
            isMember ? setUsername('default') : setUsername('')
            return isMember;
        })
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
                        onClick={()=>{}}
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
