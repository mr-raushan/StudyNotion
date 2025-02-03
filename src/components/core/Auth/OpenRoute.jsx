//this will prevent authenticated users from accessing the route

/*eslint-disable */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
}
