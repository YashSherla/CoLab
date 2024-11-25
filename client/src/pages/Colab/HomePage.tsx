import { userAtom } from "../../store/userInfoAtom"
import { useRecoilValue } from "recoil"

export const HomePage = () =>{
    const userProfile = useRecoilValue(userAtom);
    return <div>
        <h1>{userProfile?.username}</h1>
    </div>
}