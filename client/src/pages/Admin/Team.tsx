import { ListFilter, Users } from "lucide-react"
import {useRecoilValue } from "recoil"
import { userAtom } from "../../store/userInfoAtom"


export const Team = () => {
    const userProfile = useRecoilValue(userAtom);
    return (
    <div className="w-full h-full bg-white dark:bg-black">
        <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg dark:shadow-xl">
        <div className="flex justify-between px-5 py-3">
            <div className="flex gap-2 items-center">
            <Users className="dark:text-white" />
            <h1 className="dark:text-white">Team</h1>
            </div>
            <div className="flex items-center gap-2">
                <img src={userProfile?.avatar} alt="" width={35} className="rounded-md" />
                <p className="dark:text-white">{userProfile?.username}</p>
            </div>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600" />
        <div className="px-5 py-3">
            <span className="text-2xl dark:text-white">Project Teams Management</span>
            <p className="dark:text-gray-500">Manage Your team members and their account IDs</p>
        </div>
        <div className="flex justify-between p-5">
            <div>
                <h1 className="text-gray-500 text-lg">All Users 44</h1>
            </div>
            <div className="flex px-5 gap-4">
                <div className="relative w-50 h-7 flex">
                    <div className="absolute inset-y-0 mt-2 left-0 flex items-center justify-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input id="search" 
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 f dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search..." 
                    required
                    // onChange={(e)=>{
                    //     setSearchTerm(e.target.value)
                    // }}
                    />
                </div>
                <div className="gap-2 flex">
                    <div>
                    <button className="flex gap-2 justify-center dark:text-white items-center w-20 h-8 shadow-sm rounded-lg border border-gray-300" 
                    // onClick={()=>setFilterisOpen(!filterisOpen)} 
                    >
                        <ListFilter width={15}/>
                        <span className="text-sm ">Filter</span>
                    </button>
                    </div>
                    <button className="flex gap-2 justify-center items-center w-28 h-8 shadow-sm rounded-lg border border-gray-300 bg-black dark:bg-white text-white dark:text-black">
                    <span className="text-sm">+ Hire Team</span>
                    </button>
                </div>
            </div>
        </div>
        </div>
  </div>)
}