import { RecoilRoot } from 'recoil'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { SigninPage } from './pages/SigninPage'
import { DetailsPage } from './pages/Colab/DetailsPage'
import { HomePage } from './pages/Colab/HomePage'
import { CreateProject } from './components/CreateProject'
import { SearchProject } from './components/SearchProject'
import { Dashboard } from './pages/Admin/DashBoard'
import { Task } from './pages/Admin/TaskPage'

const AppwithState = () => {
  return (
    <div>
      <Routes>
        <Route path="/details" element={<DetailsPage />} />
        <Route path='/create-project' element={<CreateProject/>}/>
        <Route path="/search-projects" element={<SearchProject />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/:id/dashboard/*" element={<Dashboard />}>
          <Route path="tasks" element={<Task />} />
        </Route>
        <Route path="/" element={<HomePage />} />
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
