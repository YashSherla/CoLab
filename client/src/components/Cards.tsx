// import { DarkMode } from "../../components/Darkmode";
// import logo from "../../assets/logo.png";
// import { FaPlus } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import animeGif from '../../assets/colab.gif';

// const UserDetails: React.FC = () => (
//   <div>
//     <h3>User Details</h3>
//     <input type="text" placeholder="Enter your name" />
//   </div>
// );

// const CreateProject: React.FC = () => (
//   <div>
//     <h3>Create Project</h3>
//     <input type="text" placeholder="Project Name" />
//   </div>
// );

// const SearchProject: React.FC = () => (
//   <div>
//     <h3>Search for Project</h3>
//     <input type="text" placeholder="Search Project" />
//   </div>
// );

// interface Role {
//   roleName: string;
//   desc: string;
// }

// interface SelectRoleProps {
//   onRoleSelect: (role: string) => void;
// }

// const SelectRole: React.FC<SelectRoleProps> = ({ onRoleSelect }) => {
//   const roles: Role[] = [
//     {
//       roleName: "Admin",
//       desc: "Creates projects and tasks, and manages contributors.",
//     },
//     {
//       roleName: "Project Manager",
//       desc: "Oversees project progress and coordinates between team members.",
//     },
//     {
//       roleName: "Contributor",
//       desc: "Works on assigned tasks and contributes to project deliverables.",
//     },
//   ];

//   const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

//   const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const role = e.target.value;
//     setSelectedRole(role);
//     onRoleSelect(role);
//   };

//   return (
//     <div>
//       <div className="rounded-lg shadow-lg overflow-hidden bg-white h-[13rem]">
//         <img src={animeGif} alt="Description of the GIF" />
//       </div>
//       <div className="text-center mb-6 mt-2">
//         <h2 className='text-black dark:text-white text-2xl font-bold mb-4'>Select Your Role</h2>
//         <p className='text-gray-600 dark:text-gray-300'>
//           Please choose a role to proceed with. This will determine your permissions and access level within the platform.
//         </p>
//       </div>
//       <div className="nb-6">
//         {roles.map((role, index) => (
//           <div key={index}>
//             <label className='flex items-center'>
//               <input
//                 type="radio"
//                 name="role"
//                 value={role.roleName}
//                 onChange={handleRoleChange}
//                 className="mr-2"
//               />
//               <span className='text-black dark:text-white text-lg font-medium'>{role.roleName}</span>
//             </label>
//             <p className="text-sm dark:text-gray-300 ml-5">{role.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export const DetailsPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [selectedRole, setSelectedRole] = useState<string | null>(null);

//   const handleRoleSelect = (role: string) => {
//     setSelectedRole(role);
//     setCurrentStep(1); // Move to the next step upon role selection
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return <SelectRole onRoleSelect={handleRoleSelect} />;
//       case 1:
//         return <UserDetails />;
//       case 2:
//         return selectedRole === "Admin" ? <CreateProject /> : <SearchProject />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className='h-[50rem] w-full bg-white dark:bg-black p-6'>
//       <div className="flex justify-between">
//         <div className='flex gap-2 items-center'>
//           <img src={logo} alt="Logo" className='w-[50px]' />
//           <p className='text-black dark:text-white'>CollabSpace</p>
//         </div>
//         <div className="mt-3"><DarkMode /></div>
//       </div>
//       <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[40rem] mt-3">
//         <FaPlus className="absolute h-4 w-4 -top-2 -left-2 dark:text-white text-black" />
//         <FaPlus className="absolute h-4 w-4 -bottom-2 -left-2 dark:text-white text-black" />
//         <FaPlus className="absolute h-4 w-4 -top-2 -right-2 dark:text-white text-black" />
//         <FaPlus className="absolute h-4 w-4 -bottom-2 -right-2 dark:text-white text-black" />
//         {renderStep()}
//         <div className="absolute bottom-4 right-4">
//           {currentStep > 0 && (
//             <button onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-2 rounded-md bg-gray-300 text-gray-500">
//               Back
//             </button>
//           )}
//           <button
//             onClick={() => setCurrentStep(currentStep + 1)}
//             disabled={currentStep === 2 && !selectedRole}
//             className={`px-6 py-2 rounded-md w-full 
//               ${currentStep < 2 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
//             `}
//           >
//             {currentStep < 2 ? 'Next Step' : 'Finish'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
