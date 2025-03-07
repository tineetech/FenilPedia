import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ mustLogin, allowedRole, user }) {
  if (mustLogin && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // console.log(user)
  // return
  // if (user.isAdmin == false && allowedRole === 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}
