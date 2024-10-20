import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { DarkMode } from '../components/Darkmode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImportLoader } from '../components/Loader';
export const SignupPage = () => {
    const [fromData, setFromData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const handleChange = (e: any) => {
        setFromData({ ...fromData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3000/auth/signup', fromData);
            if (res.data.success == false) {
            setError(res.data.message);
            setLoading(false);
            } else {
                setLoading(false);
                setError(null);
                navigate('/sign-in')
            }
        } catch (error:any) {
           if (error.response && error.response.data) {
            setError(error.response.data.message || "An error occurred."); 
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-6 flex flex-col justify-between bg-zinc-900 dark:bg-zinc-95000 p-10">
                <div className='flex  gap-2 items-center'>
                    <img src={logo} alt="" className='w-[50px]' />
                    <p className='text-white '>CollabSpace</p>
                </div>
                <div className='space-y-2'>
                    <p className='text-white text-xl'>
                        “This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”</p>
                    <p className='text-gray-300 text-sm'>Jonny Sins</p>
                </div>
            </div>
            <div className="col-span-6 bg-white flex flex-col p-10  dark:bg-black">
                <div className='flex gap-3 justify-end '>
                    <Link to={'/sign-in'}><p className='text-black dark:text-white'>Signin</p></Link>
                    <DarkMode></DarkMode>
                </div>
                <div className='place-items-center mt-40 space-y-5'>
                    <div className='space-y-3'>
                        <h1 className="text-2xl font-semibold tracking-tight text-center dark:text-white">Create an account</h1>
                        <p className="text-sm dark:text-gray-400">Enter your email below to create your account</p>
                    </div>
                    <div className='w-[350px] space-y-2 '>
                        <form onSubmit={handleSubmit} className='space-y-2'>
                            <input className=" h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="username" placeholder="username" type="text" onChange={handleChange}/>
                            <input className=" h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white" id="email" placeholder="name@example.com" type="text" onChange={handleChange}/>
                            <div className="relative w-full">
                                <input
                                    className="h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                                    id="password"
                                    placeholder="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleChange}
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 dark:text-white"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <button className=" h-9 w-full rounded-md border  bg-black px-3 py-1 text-sm text-white shadow-sm transition-colors dark:bg-white dark:text-black" >
                                {loading?<ImportLoader />:"Sign Up with Email"}
                            </button>
                        </form>
                        <p className='text-red-500 text-sm'>{error}</p>
                        <div className="flex items-center justify-center text-xs uppercase">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-2 bg-background px-2 text-muted-foreground dark:text-white">Or continue with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <button className="h-9 w-full flex items-center justify-center gap-2 rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors dark:text-white">
                            <FaGoogle />
                            <p>Google</p>
                        </button>
                        <p className="px-8 text-center text-sm text-muted-foreground text-gray-400">By clicking continue, you agree to our <a className="underline underline-offset-4 hover:text-primary" href="/terms">Terms of Service</a> and <a className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}