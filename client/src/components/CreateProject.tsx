import { DarkMode } from "./Darkmode";
import logo from "../assets/logo.png";
import check from "../assets/check.png";
import { FaCalendar, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import video from '../assets/video.png';
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
// interface ProjectDetails  {
//   files:[],
//   projectName:string,
//   description:string,
//   deadline: number,
// }
export const CreateProject = () => {
  const [showProject, setShowProjectDetails] = useState(false);
  const [projectDetails , setProjectDetails] = useState({
    files:[],
    projectName:'',
    description:'',
    deadline:'',
  });

  const [showworkFlows , setShowworkFlows] = useState(false);
  const [workFlows , setWorkFlows] = useState({});

  const [showHiring , setShowHiring] = useState(false);
  const [hiring , setHiring] = useState({});

  const [stepsCompeleted , setStepsCompeleted] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [files, setFiles] = useState([]);
  const [fileUploadError, setFileUploadError] = useState("");
  const [fileuploading , setFileUploading] = useState(false);

  useEffect(() => {
    if (files) {
      handleFile()
    }
  }, [files]);
  const handleFile = () => {
    try {
      if (files.length > 0 && files.length + projectDetails.files.length < 6) {
        console.log("This is handlefile")
        const promise = Array.from(files).map((file)=>storeFile(file));
        Promise.all(promise).then((file)=>{
          setProjectDetails({
            ...projectDetails,
            files: projectDetails.files.concat(file as any) 
          });
        }).catch((error)=>{
          setFileUploading(false);
          console.error('Error uploading images:', error);
        })
        
      }else{
        setFileUploadError("You can only upload up to 6 images");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const storeFile = (file: any) => {
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app);
      const fileName = file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPerc(Math.round(progress));
      }, (error) => {
        console.log(error);
        reject(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
          resolve(downloadUrl)
        });
      });
    })
  };
  // useEffect(()=>{
  //   console.log(projectDetails);
  // },[projectDetails])
  const handleChange = (e:any) =>{
    const updatedDetails = { ...projectDetails, [e.target.id]: e.target.value };
  setProjectDetails(updatedDetails);
  const { projectName, description, deadline } = updatedDetails;
  setStepsCompeleted(!!(projectName && description && deadline));
  }
  return (
    <div className='min-h-screen w-full bg-white dark:bg-black p-6'>
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img src={logo} alt="Logo" className='w-12' />
          <p className='text-black dark:text-white'>CollabSpace</p>
        </div>
        <div className="mt-3"><DarkMode /></div>
      </div>
      <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-lg mx-auto p-4 relative mt-3 rounded-2xl h-auto md:h-auto">
        <div className="space-y-2">
          <h1 className="text-black text-2xl font-semibold dark:text-white">Create a Project</h1>
          <p className="text-black text-sm dark:text-white">Create projects of any complexity: from simple high-quality translations to ones with workflows, collaboration, deadline, and more.</p>
        </div>
        {/* Projects Details */}
        <div className={`border border-black/[0.2] dark:border-white/[0.2] transition-transform transform flex flex-col items-start w-full px-4 py-3 h-full mt-3 rounded-lg overflow-auto ${showProject ? 'h-auto' : 'h-14'}`} >
          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              {stepsCompeleted ? <img src={check} alt="" className="w-4 h-4" /> :
              <p className="w-4 h-4 rounded-lg bg-gray-600 text-white text-center justify-center text-xs">1</p>
            }
              <h1 className="dark:text-white">Project details</h1>
            </div>
            <button onClick={() => {
              setShowHiring(false)
              setShowworkFlows(false);
              setShowProjectDetails(!showProject);
              }}>
              {showProject ? <FaChevronDown className="self-center dark:text-white" /> : <FaChevronUp className="self-center dark:text-white" />}
            </button>
          </div>
          {showProject && (
            <div className="flex flex-col w-full space-y-5">
              <hr className="border-t border-black/[0.2] dark:border-white/[0.2] my-2 w-full" />
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 flex">Project Name<span className="text-red-500">*</span></p>
                  <input className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="projectName" placeholder="Project Name" type="text" 
                  onChange={handleChange}/>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 flex">Deadline<span className="text-red-500">*</span></p>
                  {/* <input className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="deadline" placeholder="Set a deadline" type="date" /> */}
                  <div className="relative">
                    <input
                      className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                      id="deadline"
                      placeholder="Set a deadline"
                      type="date"
                      value={projectDetails.deadline}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaCalendar className="text-gray-400 dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex">Description<span className="text-red-500">*</span></p>
                <textarea className="h-20 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="description" placeholder="Description" 
                onChange={handleChange} />
              </div>
              <div>
                <p className="text-sm text-gray-500">File to process</p>
                <input type="file" ref={fileRef} id="input-file-upload" onChange={(e: any) => setFiles(e.target.files)} multiple className="hidden" />
                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer border-gray-400 transition h-[10rem]">
                  <div className="text-center items-center flex flex-col" onClick={(e) => {
                    e.preventDefault();
                    fileRef.current?.click();
                  }}>
                  <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.75 10C2.75 9.58579 2.41421 9.25 2 9.25C1.58579 9.25 1.25 9.58579 1.25 10H2.75ZM21.25 14C21.25 14.4142 21.5858 14.75 22 14.75C22.4142 14.75 22.75 14.4142 22.75 14H21.25ZM15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM1.35509 5.92658C1.31455 6.33881 1.61585 6.70585 2.02807 6.7464C2.4403 6.78695 2.80734 6.48564 2.84789 6.07342L1.35509 5.92658ZM22.6449 18.0734C22.6855 17.6612 22.3841 17.2941 21.9719 17.2536C21.5597 17.2131 21.1927 17.5144 21.1521 17.9266L22.6449 18.0734ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25ZM2.84789 6.07342C2.96931 4.83905 3.23045 4.17335 3.7019 3.7019L2.64124 2.64124C1.80633 3.47616 1.48944 4.56072 1.35509 5.92658L2.84789 6.07342ZM21.1521 17.9266C21.0307 19.1609 20.7695 19.8266 20.2981 20.2981L21.3588 21.3588C22.1937 20.5238 22.5106 19.4393 22.6449 18.0734L21.1521 17.9266Z" fill="#6b7280"/>
                    <path d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="#6b7280"/>
                  </svg>
                    <p className="text-gray-500 text-sm">Drag & drop or browse file to upload</p>
                    <button className="upload-button text-sm text-gray-400">Subtitles, video, PDF, images</button>
                  </div>
                </label>
              </div>
              <div>
                <hr className="border-t border-black/[0.2] dark:border-white/[0.2] my-2 w-full" />
                <div className="grid grid-cols-12 gap-4 items-center px-4">
                  <div className="col-span-1 flex items-center justify-center gap-1">
                    <img src={video} alt="File Type" className="w-20" />
                    <p className="text-black text-lg dark:text-white ">doc</p>
                  </div>
                  <div className="col-span-7 text-center">
                    <p className="text-black text-lg text-ellipsis overflow-hidden dark:text-white px-2 whitespace-nowrap">Yash Sherla</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <p className="text-[#1fb69b] text-xs dark:bg-[#002c27] px-1 rounded-2xl border-2 border-dashed border-[#1fb69b]">{uploadPerc}%</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <FaTrash className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-0.5 bg-gray-400 mx-6" style={{ height: '20px' }}></div>
      </div>
    </div>
  );
};




















{/* Workflows */}
{/* <div className={`border border-black/[0.2] dark:border-white/[0.2] transition-transform transform flex flex-col items-start w-full px-4 py-3 h-full  rounded-lg overflow-auto ${showworkFlows ? 'h-auto' : 'h-14'}`}>
<div className="flex justify-between w-full">
  <div className="flex gap-2 items-center">
    {stepsCompeleted ? <img src={check} alt="" className="w-4 h-4" /> :
    <p className="w-4 h-4 rounded-lg bg-gray-600 text-white text-center justify-center text-xs">2</p>
  }
    <h1 className="dark:text-white">WorkFlows</h1>
  </div>
  <button onClick={() => {
    setShowProjectDetails(false);
    setShowHiring(false)
    setShowworkFlows(!showworkFlows);
  }}>
    {showworkFlows ? <FaChevronDown className="self-center dark:text-white" /> : <FaChevronUp className="self-center dark:text-white" />}
  </button>
</div>
{showworkFlows && (
  <div className="flex flex-col w-full space-y-5">
    <hr className="border-t border-black/[0.2] dark:border-white/[0.2] my-2 w-full" />
    <input className=" h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="email" placeholder="name@example.com" type="text" />
  </div>
)}
</div>
<div className="w-0.5 bg-gray-400 mx-6" style={{ height: '20px' }}></div> */}
{/* Hiring */}
{/* <div className={`border border-black/[0.2] dark:border-white/[0.2] transition-transform transform flex flex-col items-start w-full px-4 py-3 h-full  rounded-lg overflow-auto ${showHiring ? 'h-auto' : 'h-14'}`}>
<div className="flex justify-between w-full">
  <div className="flex gap-2 items-center">
    {stepsCompeleted ? <img src={check} alt="" className="w-4 h-4" /> :
    <p className="w-4 h-4 rounded-lg bg-gray-600 text-white text-center justify-center text-xs">3</p>
  }
    <h1 className="dark:text-white">Hiring</h1>
  </div>
  <button onClick={() => {
    setShowProjectDetails(false);
    setShowworkFlows(false);
    setShowHiring(!showHiring)
  }}>
    {showHiring ? <FaChevronDown className="self-center dark:text-white" /> : <FaChevronUp className="self-center dark:text-white" />}
  </button>
</div>
{showHiring && (
  <div className="flex flex-col w-full space-y-5">
    <hr className="border-t border-black/[0.2] dark:border-white/[0.2] my-2 w-full" />
  </div>
)}
</div> */}