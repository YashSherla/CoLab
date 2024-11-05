import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

export const Dashboard = () => {
    const [closeSideBar, setCloseSideBar] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`transition-all h-full bg-black border-r shadow-sm rounded-r-xl`}>
                <nav className="h-full flex flex-col">
                    <div className="p-4 pb-2 flex gap-6 items-center">
                        <div className='flex gap-2 items-center'>
                            <img src={logo} className={`overflow-hidden transition-all w-10`} />
                        {closeSideBar ? <p className='text-white'>CollabSpace</p> : null}
                        </div>  
                        {closeSideBar ?<button onClick={() => setCloseSideBar((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {closeSideBar ? <FaAngleDoubleRight /> :  <FaAngleDoubleLeft />}
                        </button> : null}
                    </div>
                </nav>
            </aside>
            {/* Main content */}
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                {/* Your main content goes here */}
            </main>
        </div>
    );
};
