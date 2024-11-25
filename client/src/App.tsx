import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { SigninPage } from './pages/SigninPage';
import { DetailsPage } from './pages/Colab/DetailsPage';
import { HomePage } from './pages/Colab/HomePage';
import { CreateProject } from './components/CreateProject';
import { SearchProject } from './components/SearchProject';
import { Dashboard } from './pages/Admin/DashBoard';
import { Task } from './pages/Admin/TaskPage';
import { PrivateRoutes } from './components/PrivateRoutes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userAtom } from './store/userInfoAtom';
import { LoadingSpinner } from './components/LoadingSpinner';
const AppwithState = () => {
  const setProfile = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const handleProfile = async () =>{
      try {
        const res = await axios.get('http://localhost:3000/user/get',{
          withCredentials:true
        });
        setProfile(res.data.user)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
  }
    handleProfile();
  },[])
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Routes>
        {/* Pass token as a prop to PrivateRoutes */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/details" element={<DetailsPage />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path="/search-projects" element={<SearchProject />} />
          <Route path="/:id/dashboard/*" element={<Dashboard />}>
            <Route path="tasks" element={<Task />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppwithState />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
