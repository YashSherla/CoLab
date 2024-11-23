import { RecoilRoot } from 'recoil';
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
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { PrivateRoutes } from './components/PrivateRoutes';
const AppwithState = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = Cookies.get('access_token');
    if (storedToken) {
      setToken(storedToken);      
    }
    // console.log(`this is token ${token}`);
  }, []);
  return (
    <div>
      <Routes>
        {/* Pass token as a prop to PrivateRoutes */}
        <Route element={<PrivateRoutes token={token} />}>
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
