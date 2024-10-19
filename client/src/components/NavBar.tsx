import { useDarkSide } from "../customHooks/useDarkSide"

export const Navbar = () => {
    const [colorTheme, setTheme] = useDarkSide();
    
    const toggleMode = () => {
        setTheme(colorTheme); 
    }
    return <div className="w-full fixed top-0 inset-x-0 z-50">
       <div className="hidden lg:flex flex-row bg-blue-400 dark:bg-transparent items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-full relative z-[60] w-full">
            <div>
                <a href="">CoLab</a>
            </div>
            <div className="space-x-5">
                <a href="">Home</a>
                <a href="">Features</a>
                <a href="">Contact</a>
            </div>
            <div className="space-x-5">
                <button onClick={() => toggleMode()}>
                Switch to {colorTheme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
                <a href="">Login</a>
                <a href="" className="p-2 bg-gray-100 rounded-sm">Get Start</a>
            </div>
       </div>
    </div>
}