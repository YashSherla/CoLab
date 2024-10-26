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
const savedRole = localStorage.getItem('role');
export const userInfoAtom = atom<UserDetail>({
    key: "userInfoAtom",
    default:  initialUserDetails
});
export const userRoleAtom = atom({
    key:'userRoleAtom',
    default:savedRole,
})