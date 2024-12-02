import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (user.role !== requiredRole) {
    // If the user does not have the required role, redirect to a "not authorized" page or home
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the required role, render the component
  return <Component {...rest} />;
};

// Add prop validation for the ProtectedRoute component
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  requiredRole: PropTypes.string.isRequired,
  rest: PropTypes.object, // This is optional, based on your implementation
};

export default ProtectedRoute;
