import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user)

    if (!user.isAdmin) {
      return <Navigate to="/" />;
    }
  
    return children;
  };

  export default ProtectedRoute;