// export const Hiring = () => {
//     return <div className={`border border-black/[0.2] dark:border-white/[0.2] transition-transform transform flex flex-col items-start w-full px-4 py-3 h-full  rounded-lg overflow-auto ${showHiring ? 'h-auto' : 'h-14'}`}>
//                 <div className="flex justify-between w-full">
//                 <div className="flex gap-2 items-center">
//                     {stepsCompeleted ? <img src={check} alt="" className="w-4 h-4" /> :
//                     <p className="w-4 h-4 rounded-lg bg-gray-600 text-white text-center justify-center text-xs">3</p>
//                 }
//                     <h1 className="dark:text-white">Hiring</h1>
//                 </div>
//                 <button onClick={() => {
//                     setShowProjectDetails(false);
//                     setShowworkFlows(false);
//                     setShowHiring(!showHiring)
//                 }}>
//                     {showHiring ? <FaChevronDown className="self-center dark:text-white" /> : <FaChevronUp className="self-center dark:text-white" />}
//                 </button>
//                 </div>
//                 {showHiring && (
//                 <div className="flex flex-col w-full space-y-5">
//                     <hr className="border-t border-black/[0.2] dark:border-white/[0.2] my-2 w-full" />
//                 </div>
//                 )}
//             </div>
// }