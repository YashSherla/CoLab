import { KanbanIcon, Layers, List, ListFilter, Table2, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskDialog } from "./components/TaskDialog";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { projectContirbuteAtomFamily } from "../../store/userInfoAtom";
import { Filter } from "./components/FilterData";

export const Task = () => {
  const params = useParams();
  const projectId = params.id;
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  
  const [activeTab, setActiveTab] = useState("profile");
  const contributorValue = useRecoilValueLoadable(projectContirbuteAtomFamily(projectId as string));
  const [contributorList, setContributorList] = useState([]);

  const [filterisOpen , setFilterisOpen] = useState(false);
  useEffect(() => {
    if (contributorValue.state === 'hasValue') {
      setContributorList(contributorValue.contents as any);
    }
    console.log(`This Contributor List ${contributorList}`);
  }, [contributorValue]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="w-full h-full bg-white dark:bg-black">
      <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg dark:shadow-xl">
        <div className="flex justify-between p-5">
          <div className="flex gap-2 items-center">
            <Layers className="dark:text-white" />
            <h1 className="dark:text-white">Task</h1>
          </div>
          <button
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 font-light shadow-sm text-sm dark:text-white"
            onClick={openDialog}
          >
            + Create Task
          </button>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600" />
        <div className="p-5">
          <span className="text-2xl dark:text-white">Project Task</span>
        </div>
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
                  <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 f dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
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
        {filterisOpen && (
          <div className="absolute top-50 right-1 transform -translate-x-4 z-10">
            <Filter isOpen={filterisOpen} />
          </div>
        )}
        <div id="default-tab-content">
          {/* Tab Panels */}
          <div className={`${activeTab === "profile" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Profile</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "dashboard" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Dashboard</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "settings" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Settings</strong> tab's associated content.
            </p>
          </div>
          <div className={`${activeTab === "contacts" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">Contacts</strong> tab's associated content.
            </p>
          </div>
        </div>
      </div>
      
      <TaskDialog isOpen={open} onClose={closeDialog} contributorList={contributorList} />
    </div>
  );
};
