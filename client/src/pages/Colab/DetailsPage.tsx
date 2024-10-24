import { DarkMode } from "../../components/Darkmode";
import logo from "../../assets/logo.png"
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { UserDetails } from "../../components/UserDetails";
import { CreateProject } from "../../components/CreateProject";
import { SearchProject } from "../../components/SearchProject";
import { SelectRole } from "../../components/SelectRole";

export const DetailsPage = () => {
    const [currentStep , setCurrentStep] = useState<number>(0);
    const [selectedRole, setSelectedRole] = useState<string | null>(window.localStorage.getItem('role')||null);
   

    // const handleRoleSelect = (role:string) =>{
    //   setSelectedRole(role);
    //   setCurrentStep(1);
    // }
    
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
        // Check if it's the last step
        if (currentStep === 1) {
           console.log("This is Yash Sherla");
           
        } else {
            setCurrentStep(currentStep + 1);
        }
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
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[40rem] mt-3">
          <FaPlus className="absolute h-4 w-4 -top-2 -left-2  dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -bottom-2 -left-2 dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -top-2 -right-2 dark:text-white text-black" />
          <FaPlus className="absolute h-4 w-4 -bottom-2 -right-2 dark:text-white text-black" />
          {renderStep()}
          {
           currentStep > 0 ?  <div className="absolute bottom-4">
              <button onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Back</button>
              </div> : null
          }
          <div className="absolute bottom-4 right-4">
              <button
                onClick={handleNext}
                disabled={!selectedRole}
                className={`px-6 py-2 rounded-md w-full 
                  ${selectedRole ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
              >
                {currentStep < 1 ? 'Next Step' : 'Finish'}
              </button>
          </div>
        </div>
      </div>
      );
} 

