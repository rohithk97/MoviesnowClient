import { useState } from 'react';
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children, ...rest}) => {
    let [user, setUser] = useState(() => (localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null))

    return !user ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;



