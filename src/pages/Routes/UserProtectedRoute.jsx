import { useState } from 'react';
import { Navigate } from 'react-router-dom'


export const PrivateRoute = ({children, ...rest}) => {
    let [user, setUser] = useState(() => (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null))

    return !user ? <Navigate to='/login'/> : children;
}

export const AdminRoute = ({children, ...rest}) => {
    let [admin, setAdmin] = useState(()=> (localStorage.getItem('user') ? localStorage.getItem('user.Admin') : null ))
    return !admin ? <Navigate to='/login'/> : children;
}

