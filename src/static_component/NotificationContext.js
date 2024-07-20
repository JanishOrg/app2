import React, { createContext, useState, useContext } from 'react';

// Create a context for notifications
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (newNotification, duration = 20000) => {
        const id = Date.now();
        const notification = { id, text: newNotification };
        setNotifications((prevNotifications) => [...prevNotifications, notification]);

        // Set a timeout to remove the notification after 'duration' milliseconds
        setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== id)
            );
        }, duration);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Hook to use notifications in any component
const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export default useNotifications;