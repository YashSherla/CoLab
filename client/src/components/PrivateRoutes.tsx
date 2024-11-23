import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = ({ token }: { token: string }) => {
    console.log(token);
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
};