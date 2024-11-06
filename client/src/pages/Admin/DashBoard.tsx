import { createContext, useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { LayoutDashboard, StickyNote, Layers, Calendar, LifeBuoy, Settings, Users, PieChart } from "lucide-react";
import { Link, Route, Routes, useLocation} from "react-router-dom";
import { Task } from "./TaskPage";
import { Team } from "./Team";

const SidebarContext = createContext(false);

export const Dashboard = () => {
    return (
            <SideBar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to='' />
                <SidebarItem icon={<StickyNote size={20} />} text="Projects" alert />
                <SidebarItem icon={<Layers size={20} />} text="Tasks" to='tasks' />
                <SidebarItem icon={<Users size={20} />} text="Team" to='teams'/>
                <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
                <SidebarItem icon={<PieChart size={20} />} text="Analytics" />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text="Settings" />
                <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            </SideBar>
    );
};

const SideBar = ({ children }: any) => {
    const [closeSideBar, setCloseSideBar] = useState(false);
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`transition-all h-full bg-black border-r shadow-sm rounded-r-xl ${closeSideBar ? 'w-20' : 'w-64'} group duration-200 hover:w-64`}
            >
                <nav className="h-full flex flex-col">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img src={logo} className={`w-10`} />
                            {/* Only show the text when sidebar is open */}
                            <p className={`text-white ${closeSideBar ? 'hidden group-hover:block' : 'block'} hover:block`}>
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
                </nav>
            </aside>

            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <Routes>
                    <Route path="/dasboard/*" element={<Dashboard />} />
                    <Route path="/tasks" element={<Task />} />
                    <Route path="/teams" element={<Team />} />
                </Routes>
            </div>
        </div>
    );
};

export function SidebarItem({ icon, text, alert , to }: any) {
    const closeSideBar = useContext(SidebarContext);
    const location = useLocation();
    const res = location.pathname;
    console.log(res);
    const match = location.pathname === `/dashboard/${to}` || (to === '' && location.pathname === '/dashboard');
    console.log(match);
    return (
        <li>
            <Link to={to}
            className={`relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-colors group ${match ? "bg-white bg-opacity-20 text-white" : "hover:bg-white hover:bg-opacity-20 hover:text-white text-gray-600"}`}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${closeSideBar ? "w-0 group-hover:w-52 ml-3" : "w-52 ml-3"}`}
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
