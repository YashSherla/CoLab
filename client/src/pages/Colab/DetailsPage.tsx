import { DarkMode } from "../../components/Darkmode";

export const DetailsPage = () => {
    return (
      <div className='h-[50rem] w-full bg-white dark:bg-black flex items-center justify-center'>
        <h1 className="text-black dark:text-white text-3xl font-bold">
            Details Pages
        </h1>
        <DarkMode></DarkMode>
      </div>
      );
}