import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login first !!!");
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;