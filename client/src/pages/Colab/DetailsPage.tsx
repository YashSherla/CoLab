import { DarkMode } from "../../components/Darkmode";
import logo from "../../assets/logo.png"

export const DetailsPage = () => {
    return (
      <div className='h-[50rem] w-full bg-white dark:bg-black  p-6'>
        <div className="flex justify-between">
          <div className='flex  gap-2 items-center'>
              <img src={logo} alt="" className='w-[50px]' />
              <p className='text-black dark:text-white'>CollabSpace</p>
          </div>
          <div className="mt-3"><DarkMode></DarkMode></div>
        </div>
        <div className="flex flex-col  w-max border-solid border-4 border-gray-600">
          <div>
            Role for this Page
          </div>
        </div>
      </div>
      );
}