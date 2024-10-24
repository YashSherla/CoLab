import { useEffect, useRef, useState} from "react";
import { FileUpload } from "./FileUpload";
import { userInfoAtom } from "../store/userInfoAtom";
import { useRecoilState } from "recoil";
import { getStorage , ref , uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { app } from "../firebase";

export const UserDetails = () => {
    const fileRef = useRef();
    const [userDetails, setUserdetails] = useRecoilState(userInfoAtom);
    const [uploadPerc, setUploadPerc] = useState(0)
    const [file , setFile ] = useState(undefined)
    const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id === 'skills') {
            setUserdetails(prevs=>({
                ...prevs,
                skills: value.split(',').map(skill => skill.trim())
            }))
        } else if(id === 'graduatedYear') {
            setUserdetails(prevs=>({
                ...prevs,
                [id]:value?parseInt(value):null
            }))
        }else{
            setUserdetails(prevs=>({
                ...prevs,
                [id]:value,
            }))
        }
    };
    useEffect(()=>{
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("User Details"+userDetails);
    },[userDetails])
    // useEffect(()=>{
    //     handleProfileImage(file);
    // },[file])
    const handleProfileImage = (file:any) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPerc(Math.round(progress));
        },(error)=>{
            console.log(error);
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                console.log(downloadUrl);
                
                
            })
        })

    }
   return (
    <div className="w-full">
        <form className="space-y-5 flex flex-col items-center w-full">
            <div className="group relative w-[120px] h-[120px] hover:border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg transition-all hover:dark:border-blue-400 hover:border-blue-400">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-4 group-hover:translate-x-4">
                <input
                    // onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    ref={fileRef}
                    hidden
                    accept='image/*'
                />
                <div className="flex items-center justify-center  group-hover:opacity-80  w-full h-full  bg-white rounded-lg shadow-md dark:bg-neutral-900 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="h-4 w-4 text-neutral-600 dark:text-neutral-300"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path><path d="M7 9l5 -5l5 5"></path><path d="M12 4l0 12"></path></svg>
                </div>
                </div>
            </div>
            <input 
                className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="skills" 
                placeholder="Skills" 
                type="text"
                value={userDetails.skills}
                onChange={handleUserInfoChange} 
            />
            {/* Experience Input */}
            <input 
                className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="experience" 
                placeholder="Experience (e.g. 5 years in marketing)" 
                type="text"
                value={userDetails.experience}
                onChange={handleUserInfoChange} 
            />
            {/* Degree Input */}
            <input 
                className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="degree" 
                placeholder="Degree" 
                type="text" 
                value={userDetails.degree}
                onChange={handleUserInfoChange} 
            />
            
            {/* Institution Textarea */}
            <textarea 
                className="h-20 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="institution" 
                placeholder="Institution" 
                value={userDetails.institution}
                onChange={handleUserInfoChange}
            />
            
            {/* Graduation Year Input */}
            <input 
                className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="graduatedYear" 
                placeholder="Graduated Year (YYYY)" 
                type="text" 
                pattern="\d{4}"
                value={userDetails.graduatedYear ? userDetails.graduatedYear : undefined}
                onChange={handleUserInfoChange} 
            />
            
            {/* About You Textarea */}
            <textarea 
                className=" h-20 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" 
                id="aboutme" 
                placeholder="About Me" 
                value={userDetails.aboutme}
                onChange={handleUserInfoChange} 
            />
        </form>
    </div>)  
};