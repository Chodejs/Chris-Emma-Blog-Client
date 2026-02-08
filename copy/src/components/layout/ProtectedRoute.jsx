import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // 1. Check if the VIP pass exists in storage
    const token = localStorage.getItem('token');

    // 2. If no token, kick them back to the Login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 3. If token exists, let them pass (render the child routes)
    return <Outlet />;
};

export default ProtectedRoute;