import { createContext, useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { LayoutDashboard, StickyNote, Layers, Calendar, LifeBuoy, Settings, Users, PieChart } from "lucide-react";
import { Link, Route, Routes, useLocation, useMatch, useNavigate, useParams} from "react-router-dom";
import { Task } from "./TaskPage";
import { Team } from "./Team";
import { DashBoardHomePage } from "./DashBoardHomePage";
import { DarkMode } from "../../components/Darkmode";

const SidebarContext = createContext(false);

export const Dashboard = () => {
    return (
            <SideBar>
                <div className="flex flex-col justify-between">
                    <div className="h-full">
                        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to='home' />
                        <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
                        <SidebarItem icon={<Layers size={20} />} text="Tasks" to='tasks' />
                        <SidebarItem icon={<Users size={20} />} text="Team" to='teams'/>
                        <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
                        <SidebarItem icon={<PieChart size={20} />} text="Analytics" />
                        <hr className="my-3 dark:border-gray-700" />
                    </div>
                    <div className="h-full">
                        <SidebarItem icon={<Settings size={20} />} text="Settings" />
                        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
                    </div>
                </div>
                
            </SideBar>
    );
};
const SideBar = ({ children }: any) => {
    const [closeSideBar, setCloseSideBar] = useState(false);
    return (
        <div className="flex h-screen dark:bg-black ">
            {/* Sidebar */}
            <aside
                className={`transition-all h-full  dark:bg-black border-r dark:border-gray-700 rounded-r-3xl bg-white shadow-sm  ${closeSideBar ? 'w-20' : 'w-64'} group duration-200 hover:w-64`}
            >
                <nav className="h-full flex flex-col">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img src={logo} className={`w-10`} />
                            {/* Only show the text when sidebar is open */}
                            <p className={`text-black dark:text-white ${closeSideBar ? 'hidden group-hover:block' : 'block'} hover:block`}>
                                CollabSpace
                            </p>
                        </div>
                        {/* Toggle button only appears when sidebar is closed */}
                        <button
                            onClick={() => setCloseSideBar((curr) => !curr)}
                            className={`p-1.5 rounded-lg bg-[#d0f57a] ${closeSideBar ? 'hidden group-hover:block' : 'block'} hover:block`}
                        >
                            {closeSideBar ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
                        </button>
                    </div>
                   <div className="mt-2">
                        <SidebarContext.Provider value={closeSideBar}>
                            <ul className="flex-1 px-3">{children}</ul>
                        </SidebarContext.Provider>
                   </div>
                   <div className="p-6 flex">
                        <DarkMode/>
                   </div>
                </nav>
            </aside>

            <div className="flex-1 p-1  bg-white dark:bg-black overflow-auto">
                <Routes>
                    <Route path="/dasboard/*"/>
                    <Route path="/home" element={<DashBoardHomePage />} />
                    <Route path="/tasks" element={<Task />} />
                    <Route path="/teams" element={<Team />} />
                </Routes>
            </div>
        </div>
    );
};
export function SidebarItem({ icon, text, alert , to }: any) {
    const closeSideBar = useContext(SidebarContext);
    const { id } = useParams();
    console.log(id);
    const location = useLocation();
    const match = location.pathname === `/${id}/dashboard/${to}` || (to === '' && location.pathname === ':id/dashboard');
    return (
        <li>
            <Link to={to}
            className={`relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-colors group 
            ${match ? "bg-gray-600 bg-opacity-20 dark:bg-white dark:bg-opacity-20 dark:text-white " 
            : "hover:bg-gray-600 hover:bg-opacity-20 dark:hover:bg-white dark:hover:bg-opacity-20 dark:hover:text-white text-gray-600"}`}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all text-sm duration-200 ease-in-out ${closeSideBar ? "w-0 group-hover:w-52 ml-3" : "w-52 ml-3"}`}
                >
                    {text}
                </span>
                {/* {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${closeSideBar ? "group-hover:top-2" : "top-2"}`} />
                )} */}
            </Link>
        </li>
    );
}
