import { RecoilRoot } from 'recoil'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { SigninPage } from './pages/SigninPage'
import { MainPage } from './pages/Colab/MainPage'

const AppwithState = () => {
  return (
    <div className='h-[50rem] w-full dark:bg-black bg-white '>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
     </Routes>
    </div>
  )
}
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppwithState />
      </BrowserRouter>
    </RecoilRoot> 
  )
}
export default App
