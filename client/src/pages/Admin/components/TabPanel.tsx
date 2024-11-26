import { Kanban } from "./Kanban";

interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string;  // or Date if you parse it
  bounty: string;
  status: string;    // You might want to make this more specific with a union type
  assignedUsers: string[];
  projectId: string;
  comment: any[];    // You might want to define a Comment interface
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}
interface TabPanelProps {
    activeTab:string
    task:Task[]
}
export const TabPanel = ({activeTab,task}:TabPanelProps) =>{
    return (
        <div id="default-tab-content">
          {/* Kanban */}
          <Kanban activeTab={activeTab} task={task} />
          <div className={`${activeTab === "dashboard" ? "block" : "hidden"} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {task.map((value:any,index)=>{
                return <p key={index}>{value.name}</p>
              })}
            </div>
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
    )
}