import { useState } from 'react';
import { Navigate } from 'react-router-dom'


export const PrivateRoute = ({children, ...rest}) => {
    let [user, setUser] = useState(() => (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null))

    return !user ? <Navigate to='/login'/> : children;
}

export const AdminRoute = ({children, ...rest}) => {
    const user = JSON.parse(localStorage.getItem('user')); // Parse as a boolean
    
    if (user && user.Admin === 'true') {
        return children;
      } else {
        return <Navigate to='/login' />;
      }
}

