import React from 'react';


export const UserContext = React.createContext()
const UserProvider = ({ children }) => {
    return (
        <UserContext.Provider value="greeting">
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
