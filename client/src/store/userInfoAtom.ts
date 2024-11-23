import axios from 'axios';
import { atom, atomFamily, selectorFamily } from 'recoil';
import { UserProfile } from '../types/type';
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
export const projectContirbuteAtomFamily = atomFamily({
    key:"projectContirbuteAtomFamily",
    default:selectorFamily({
        key:"ProjectContirbuteSelectorFamily",
        get:(projectId:string) =>async () => {
            try {
                const res = await axios.get(`http://localhost:3000/project/contributor/${projectId}`)
                const data = res.data.projectContributor;
                console.log("This is AtomContri" + data[0].username);
                return data
            } catch (error) {
                console.log(error);
                return null
            }
        }
    })
})

export const taskFilterAtomFamily = atomFamily({
    key:"taskFilterAtomFamily",
    default:selectorFamily({
        key:"taskFilterSelectorFamily",
        get:(projectId:string) => async () => {
            try {
                const res = await axios.get(`http://localhost:3000/task/get/${projectId}`)
                const tasks = res.data.task;
                return tasks;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    })
})

export const userAtom = atom<UserProfile | null>({
    key: "userAtom",
    default: null,
})