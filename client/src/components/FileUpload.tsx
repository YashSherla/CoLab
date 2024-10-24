export const FileUpload = () =>{
    return (
    <div className="group relative w-[120px] h-[120px] hover:border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg transition-all hover:dark:border-blue-400 hover:border-blue-400">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-4 group-hover:translate-x-4">
            <div className="flex items-center justify-center  group-hover:opacity-80  w-full h-full  bg-white rounded-lg shadow-md dark:bg-neutral-900 dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="h-4 w-4 text-neutral-600 dark:text-neutral-300"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path><path d="M7 9l5 -5l5 5"></path><path d="M12 4l0 12"></path></svg>
            </div>
        </div>
    </div>)
}   