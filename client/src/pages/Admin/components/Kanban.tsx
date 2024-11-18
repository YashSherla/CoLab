import { Circle } from "lucide-react"
import { Task } from "../../../types/type"
interface KanBanProps {
    activeTab:string,
    task: Task[]
}
export const Kanban = ({activeTab,task}:KanBanProps) =>{
    return (
        <div className={`${activeTab === "profile" ? "block" : "hidden"} p-4`}>
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3">
                    <div className="w-30 h-8 bg-gray-100 rounded flex px-3 py-1 gap-1">
                        <Circle width={15} className="text-blue-500"/>
                        <p>Not Started</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="w-30 h-8 bg-gray-100 rounded flex px-3 py-1 gap-1">
                        <Circle width={15} className="text-yellow-500"/>
                        <p>In Progress</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="w-30 h-8 bg-gray-100 rounded flex px-3 py-1 gap-1">
                        <Circle width={15} className="text-green-500"/>
                        <p>Completed</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="w-30 h-8 bg-gray-100 rounded flex px-3 py-1 gap-1">
                        <Circle width={15} className="text-red-500"/>
                        <p>Cancelled</p>
                    </div>
                </div>
            </div>
        </div>
    )
}