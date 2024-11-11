import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from 'react-select';
import active from '../../../assets/active.png'
import inactive from '../../../assets/inactive.png'
const customSingleValue = ({ data }: any) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={data.avatar} alt={data.username} className="w-6 h-6 rounded-full" />
      <span>{data.username}</span>
    </div>
  );
};

const customMultiValue = ({ data }: any) => {
  return (
    <div className={`flex items-center space-x-2  rounded-full px-2 py-1 ${data.active ? 'bg-green-300' : 'bg-red-300'}`}>
      <img src={data.avatar} alt={data.username} className="w-5 h-5 rounded-full" />
      <span>{data.username}</span>
    </div>
  );
};
type Contributor = {
  _id:string,
  username:string,
  avatar:string,
  active:string,
}
export const TaskDialog = ({isOpen, onClose,contributorList}:any) =>{
    const params = useParams();
    const projectId = params.id;
    const [taskForm, setTaskForm] = useState({
      name: "",
      description: "",
      bounty: "NA",
      status: "Not Started",
      assignedUsers: [], // Store contributor _ids
      deadline:'2024-11-19'
    });
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [task, setTask] = useState({});
    const StatusList = [
    'Not Started',
    'In Progress',
    'Completed', 
    'Archived', 
    'Cancelled']
    const Bounty = [
        "NA",
        "50$",
        "100$",
        "500$",
        "1000$",
        "2000$",
    ]
    if (!isOpen) {
        return null
    }
    const handleCreateTask = async () => {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const res = await axios.post(`http://localhost:3000/task/create/${projectId}`,taskForm,{withCredentials:true});
        if (res.data.success === false) {
          setError(res.data.message);
          setLoading(false);
        }
        setLoading(false);
        setError(""); 
        alert("Successfully")
        setTask(res.data.task)
      } catch (error:any) {
        setLoading(false);
        setError(error);
        alert(error)
      }
    }
    const handleChange = (e:any) =>{
      setTaskForm({
        ...taskForm,
        [e.target.id]:e.target.value
      })
    }
    // useEffect(()=>{
    //   console.log(taskForm);
    // },[taskForm])
    const handleSelectChange = (selected: any) => {
      setTaskForm({
        ...taskForm,
        assignedUsers: selected.map((option: any) => option.value),
      });
      console.log(`This taskForm from hanldeSelectChange ${taskForm}`);
    };
    const selectOptions = contributorList.map((contributor: Contributor) => ({
      value: contributor._id, // This will be the ID of the contributor
      label: contributor.username, // The username will be the label
      ...contributor,
    }));
    return (
    loading ? <h1 className="text-center">Loading....</h1> :<div className="overflow-y-auto overflow-x-hidden fixed  inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Task
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleCreateTask}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="task-name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type task name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="task-category"
                  >
                    Bounty
                  </label>
                  <select
                    id="bounty"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {Bounty.map((value,index)=>{
                        return <option value={value} key={index}>{value}</option>
                    })}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="task-category"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {StatusList.map((value,index)=>{
                        return <option value={value} key={index}>{value}</option>
                    })}
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="task-name"
                  >
                    Assigne
                  </label>
                  <Select
                    isMulti
                    options={selectOptions}
                    onChange={handleSelectChange}
                    formatOptionLabel={(contributorList:Contributor) => (
                      <div className="flex items-center space-x-4">
                        {contributorList.active ? <img src={active} width={20} /> : <img src={inactive} width={20}  /> }
                       
                        <div className="flex space-x-2">
                          <img
                            src={contributorList.avatar}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{contributorList.username}</span>
                        
                        </div>
                      </div>
                    )}
                    components={{SingleValue:customSingleValue,MultiValue:customMultiValue}}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderColor: '#ddd',
                        padding: '2px',
                        borderRadius: '0.375rem',
                        backgroundColor: '#F9FAFB', 
                        boxShadow: 'none',
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        borderRadius: '9999px',
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: '#1f2937', // This is the text color for dark mode (text-gray-900)
                      }),
                      option:(provider) =>({
                        ...provider,
                        backgroundColor: '#F9FAFB', 
                      })
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write task description here"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                // onClick={handleCreateTask}
              >
                Add New Task
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}