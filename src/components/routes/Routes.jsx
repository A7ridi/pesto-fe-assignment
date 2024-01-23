import { Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../../auth/Login";

export default function Router({ isLoggedInUser, user }) {
  const ProtectedRoute = ({ element, redirectTo, ...rest }) =>
    isLoggedInUser ? element : <Navigate to={redirectTo} replace />;

  const LoginRedirect = () =>
    isLoggedInUser ? <Navigate to="/" replace /> : <Login />;

  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <ProtectedRoute
              element={<Dashboard user={user} />}
              redirectTo="/login"
            />
          ),
          index: true,
        },
      ],
    },
    {
      path: "login",
      element: <LoginRedirect />,
    },
  ]);
  return routes;
}
