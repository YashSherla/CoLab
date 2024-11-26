import { Navigate, Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userInfoAtom";

export const PrivateRoutes = () => {
    // const cookies = document.cookie.split(';');
    // const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('access_token='));
    const userProfile = useRecoilValue(userAtom);
    return userProfile ? <Outlet  /> : <Navigate to="/sign-in" />;
};