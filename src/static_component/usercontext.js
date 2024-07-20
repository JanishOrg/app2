import React, { createContext, useState, useContext } from 'react';

// Create a context for user data
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        phoneNumber: '',
    });

    // Function to update user data
    const updateUser = (newUserData) => {
        setUser((prevUser) => ({ ...prevUser, ...newUserData }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use user data in any component
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
