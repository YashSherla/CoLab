import { useState } from "react";

export const ModeChange = ()=>{
    const [dark,setDark] = useState(false);
    const handledarkMode =()=>{
    setDark(!dark);
    document.body.classList.toggle('dark')
  } 
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
         
          <div>
            <button onClick={()=>handledarkMode()} className='text-black dark:text-white'>Click Me</button>
          </div>
        </div>
      )
}