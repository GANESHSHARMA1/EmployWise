import { createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null)

    const showSuccess = (message) => {
        setNotification({ message, severity: 'success' })
    }

    const showError = (message) => {
        setNotification({ message, severity: 'error' })
    }

    return (
        <NotificationContext.Provider value={{ showSuccess, showError }}>
            {children}
            <Snackbar
                open={!!notification}
                autoHideDuration={3000}
                onClose={() => setNotification(null)}
            >
                <Alert severity={notification?.severity}>
                    {notification?.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}

export function useNotification() {
    return useContext(NotificationContext)
}

export default NotificationProvider