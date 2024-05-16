import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.data ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
