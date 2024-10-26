import { DarkMode } from "../../components/Darkmode";
import logo from "../../assets/logo.png"
import errorImg from "../../assets/close.png"
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { UserDetails } from "../../components/UserDetails";
import { SelectRole } from "../../components/SelectRole";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoAtom, userRoleAtom } from "../../store/userInfoAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface UserDetail {
  role:string
  avatar:string,
  skills:string[],
  education:{
    degree:string,
    institution:string,
    graduatedYear:number | null,
  }
  experience:string,
  aboutme:string,
}
export const DetailsPage = () => {
    const [currentStep , setCurrentStep] = useState<number>(0);
    const [selectedRole, setSelectedRole] = useRecoilState(userRoleAtom);
    const userDetails = useRecoilValue(userInfoAtom);
    const [showDialog,setShowDialog] = useState(false);
    const navigate = useNavigate();
    const [allUserDetails , setAllUserDetails] = useState<UserDetail>({
      role: '',
      avatar: '',
      skills: [],
      experience: '',
      education:{
        degree: '',
        institution: '',
        graduatedYear: null,
      },
      aboutme: '',
  })
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(null)
    // const handleRoleSelect = (role:string) =>{
    //   setSelectedRole(role);
    //   setCurrentStep(1);
    // }
   useEffect(()=>{
      setAllUserDetails({
        role: selectedRole || '',
        avatar: userDetails.avatar,
        skills: userDetails.skills,
        experience: userDetails.experience,
        education:{
          degree: userDetails.degree,
          institution: userDetails.institution,
          graduatedYear: userDetails.graduatedYear,
        },
        aboutme: userDetails.aboutme,
    });
   },[selectedRole, userDetails])
    const handleSubmit =async () =>{
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const res =await axios.post('http://localhost:3000/userInfo/create',allUserDetails,{
          withCredentials:true
        });
        if (res.data.success == false) {
          setError(res.data.message);
          setShowDialog(true);
          } else {
              setLoading(false);
              setError(null);
              setShowDialog(false);
              if (selectedRole === 'Admin') {
                navigate('/create-project')
              }else{
                navigate('/search-projects')
              }
          }
      } catch (error:any) {
        setError(error.response?.data.message || "An error occurred.");
        setShowDialog(true);
      }finally{
        setLoading(false)
      }
    }
    const renderStep = () =>{
      switch (currentStep) {
        case 0:
          return <SelectRole onRoleSelect={setSelectedRole}></SelectRole>
        case 1:
          return <UserDetails></UserDetails> 
        // case 2:
        //   return selectedRole  === 'Admin' ? <CreateProject/> : <SearchProject />;
        default:
          null;
      }
    }
      const handleNext = () => {
        if (currentStep === 1) {
        handleSubmit();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };
    const closeDialog = () => {
        setShowDialog(false);
        setError(null); // Optionally clear the error
    };
    return (
      <div className='h-[50rem] w-full bg-white dark:bg-black  p-6'>
        <div className="flex justify-between">
          <div className='flex  gap-2 items-center'>
              <img src={logo} alt="" className='w-[50px]' />
              <p className='text-black dark:text-white'>CollabSpace</p>
          </div>
          <div className="mt-3"><DarkMode></DarkMode></div>
        </div>
        {/* Card */}
        {<div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[40rem] mt-3">
          <FaPlus className="absolute h-4 w-4 -top-2 -left-2  dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -bottom-2 -left-2 dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -top-2 -right-2 dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -bottom-2 -right-2 dark:text-white text-black" />
          {loading?
          <div className="flex flex-col justify-center items-center h-full w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="150" height="75">
              <path
                className="text-black dark:text-white"
                fill="none"
                stroke="currentColor" // Use currentColor for responsiveness
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="300 385"
                strokeDashoffset="0"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
              >
                <animate
                  className="text-black dark:text-white"
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="2.9"
                  values="685;-685"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
          :renderStep()}
          {
           currentStep > 0 ?  <div className="absolute bottom-4">
              <button onClick={() => {
                loading ? null :setCurrentStep(currentStep - 1)
              }}  className={`px-6 py-2 rounded-md w-full 
                  ${!selectedRole || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}
                `}>Back</button>
              </div> : null
          }
          <div className="absolute bottom-4 right-4">
              <button
                onClick={handleNext}
                disabled={!selectedRole}
                className={`px-6 py-2 rounded-md w-full 
                  ${!selectedRole || loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}
                `}
              >
                {currentStep < 1 ? 'Next Step' : 'Finish' }
              </button>
          </div>
        </div>}
        {showDialog && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60">
              <div className="relative m-4 p-5  rounded-lg bg-white shadow-sm dark:bg-gray-800 transition-all">
                  <div className="flex items-center pb-4 text-xl font-medium text-red-500 gap-2">
                      <img src={errorImg} alt=""className="w-[20px] h-[20px]" />
                      <h1>Error</h1>
                  </div>
                  <div className="relative border-t border-slate-200 dark:border-slate-700 py-4 leading-normal text-red-600 font-light">
                      {error}
                  </div>
                  <div className="py-2 text-sm text-slate-500 dark:text-slate-400">
                      <p>If you need assistance, please check the following:</p>
                      <ul className="list-disc pl-5">
                          <li>Verify your input data.</li>
                          <li>Ensure your network connection is stable.</li>
                          <li>Contact support if the problem persists.</li>
                      </ul>
                  </div>
                  <div className="flex justify-end pt-4">
                      <button 
                          onClick={closeDialog} 
                          className="rounded-md bg-green-600 py-2 px-4 text-white transition-all hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                      >
                          Close
                      </button>
                  </div>
              </div>
          </div>
        )}

      </div>
      );
} 

