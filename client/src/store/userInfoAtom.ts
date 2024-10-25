import { atom } from 'recoil';
interface UserDetail {
    avatar:string,
    skills:string[],
    experience:string,
    degree:string,
    institution:string,
    graduatedYear:number | null,
    aboutme:string,
}
const savedUserDetails = localStorage.getItem('userDetails');
const initialUserDetails: UserDetail = savedUserDetails ? JSON.parse(savedUserDetails) : {
    avatar:'',
    skills: [],
    experience: '',
    degree: '',
    institution: '',
    graduatedYear: null,
    aboutme: ''
};

export const userInfoAtom = atom<UserDetail>({
    key: "userInfoAtom",
    default:  initialUserDetails
});