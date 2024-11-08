import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskDialog } from "./components/TaskDialog";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { projectContirbuteAtomFamily } from "../../store/userInfoAtom";
// interface ContributorDetails {
//     username:string,
//     active:boolean,
//     avatar:string,
// }
export const Task = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const params = useParams();
  const contributorValue = useRecoilValueLoadable(projectContirbuteAtomFamily(params.id as string));
  const [contributorList,setContributorList] = useState([])
    useEffect(()=>{
            if (contributorValue.state === 'hasValue') {
                setContributorList(contributorValue.contents as any)
            }
            console.log(`This Contributor List ${contributorList}`);
        },[contributorValue])
  return (
    <div className="w-full h-full bg-white dark:bg-black">
      <div className={`w-full h-full border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg dark:shadow-xl`}>
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
      </div>
      <TaskDialog isOpen={open} onClose={closeDialog} contributorList={contributorList} />
    </div>
  );
};


