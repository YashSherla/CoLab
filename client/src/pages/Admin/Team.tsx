import { Users } from "lucide-react"


export const Team = () => {
    return (
    <div className="w-full h-full bg-white dark:bg-black">
        <div className="w-full h-full border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg dark:shadow-xl">
        <div className="flex justify-between p-5">
            <div className="flex gap-2 items-center">
            <Users className="dark:text-white" />
            <h1 className="dark:text-white">Team</h1>
            </div>
            <div>
                Yash Sherla
            </div>
        </div>
        <hr className="border-t border-gray-300 dark:border-gray-600" />
        <div className="p-5">
            <span className="text-2xl dark:text-white">Project Task</span>
        </div>
        </div>
  </div>)
}