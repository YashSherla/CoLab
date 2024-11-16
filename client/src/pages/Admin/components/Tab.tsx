import axios from "axios";
import { KanbanIcon, ListFilter, Table2, TimerIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List } from "rsuite"
interface TabProps {
    activeTab:string;
    handleTabChange:(value:string)=>void;
    setFilterisOpen:(filterisOpen:boolean)=>void;
    filterisOpen:boolean;
}
export const Tab = ({activeTab,handleTabChange,setFilterisOpen,filterisOpen}:TabProps) =>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchTerm,setSearchTerm] = useState('')
    const [taskdata , setTaskdata] = useState({
        search:'',
    })
    useEffect(()=>{
        // const urlParams = new URLSearchParams(location.search);
        // setTaskdata({
        //     search:searchTerm
        // })
        const handleSumbit = async () => {
            await new Promise((resolve)=>setTimeout(resolve, 1000))
            try {
                const res = await axios.get(`http://localhost:3000/task/get/${id}?searchTerm=${searchTerm}`)  
                const data = res.data;
                console.log(data.task);
            } catch (error) {
                console.log(error);
            }
        }
        handleSumbit()
    },[searchTerm])
    return (
    <div className="border-b px-5 border-gray-200 dark:border-gray-700 flex justify-between">
        <div>
            <ul className="flex flex-wrap text-sm font-medium" id="default-tab" role="tablist">
            <li className="me-2" role="presentation">
                <button
                className={`flex gap-2 items-center px-4 py-2 border-b-2 rounded-t-lg ${activeTab === "profile" ? "border-black text-black dark:border-white dark:text-white" : "border-transparent text-gray-400 dark:text-gray-300"}`}
                onClick={() => handleTabChange("profile")}
                >
                <KanbanIcon />
                <span>Kanban</span>
                </button>
            </li>
            <li className="me-2" role="presentation">
                <button
                className={`flex gap-2 items-center px-4 py-2 border-b-2 rounded-t-lg ${activeTab === "dashboard" ? "border-black text-black dark:border-white dark:text-white" : "border-transparent text-gray-400 dark:text-gray-300"}`}
                onClick={() => handleTabChange("dashboard")}
                >
                <Table2 />
                <span>Table</span>
                </button>
            </li>
            <li className="me-2" role="presentation">
                <button
                className={`flex gap-2 items-center px-4 py-2 border-b-2 rounded-t-lg ${activeTab === "settings" ? "border-black text-black dark:border-white dark:text-white" : "border-transparent text-gray-400 dark:text-gray-300"}`}
                onClick={() => handleTabChange("settings")}
                >
                <List />
                <span>List</span>
                </button>
            </li>
            <li role="presentation">
                <button
                className={`flex gap-2 items-center px-4 py-2 border-b-2 rounded-t-lg ${activeTab === "contacts" ? "border-black text-black dark:border-white dark:text-white" : "border-transparent text-gray-400 dark:text-gray-300"}`}
                onClick={() => handleTabChange("contacts")}
                >
                <TimerIcon />
                <span>Timeline</span>
                </button>
            </li>
            </ul>
        </div>
        <div className="flex px-5 gap-4">
              <div className="relative w-32 h-7 flex">
                  <div className="absolute inset-y-0 mt-2 left-0 flex items-center justify-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input id="search" 
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 f dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Search..." 
                  required
                  onChange={(e)=>{
                    // const urlParams = new URLSearchParams();
                    setSearchTerm(e.target.value)
                    // urlParams.set('searchTerm',taskdata.search)
                    // const searchQuery = urlParams.toString();
                    // navigate(`/tasks?${searchQuery}`)
                  }}
                   />
              </div>
              <div className="h-9 border-l border-gray-300"></div>
              <div className="gap-2 flex">
                <div>
                  <button className="flex gap-2 justify-center dark:text-white items-center w-20 h-8 shadow-sm rounded-lg border border-gray-300" onClick={()=>setFilterisOpen(!filterisOpen)} >
                    <ListFilter width={15}/>
                    <span className="text-sm ">Filter</span>
                  </button>
                </div>
                <button className="flex gap-2 justify-center items-center w-28 h-8 shadow-sm rounded-lg border border-gray-300 bg-black dark:bg-white text-white dark:text-black">
                  <span className="text-sm">+ Create Task</span>
                </button>
              </div>
        </div>
    </div>
    )
}