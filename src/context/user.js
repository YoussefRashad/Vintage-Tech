import React from 'react';

export const UserContext = React.createContext()

function getUserFromLocalStorage() {
    return localStorage.getItem('user') ? 
            JSON.parse(localStorage.getItem('user')) : { usrname: null, token: null }
}

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(getUserFromLocalStorage());
    const [alert, setAlert] = React.useState({
        show: false,
        msg: "",
        type: "success"
    })

    const showAlert = ({ msg, type = "success" }) => {
        console.log(type);
        setAlert({
            show: true,
            msg,
            type
        })
    }
    const hideAlert = () => {
        setAlert({...alert, show: false})
    }
    
    const userLogin = (user)=>{
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }
    const userLogout = ()=>{
        setUser({ usrname: null, token: null })
        localStorage.removeItem('user')
    }
    return (
        <UserContext.Provider value={{
            user,
            userLogin,
            userLogout,
            alert,
            showAlert,
            hideAlert
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
