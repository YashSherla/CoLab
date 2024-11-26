import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate, Routes, Route, } from 'react-router-dom';
import axios from 'axios';

// Components and Pages
import { LoadingSpinner } from './components/LoadingSpinner';
import { SignupPage } from './pages/SignupPage';
import { SigninPage } from './pages/SigninPage';
import { DetailsPage } from './pages/Colab/DetailsPage';
import { HomePage } from './pages/Colab/HomePage';
import { CreateProject } from './components/CreateProject';
import { SearchProject } from './components/SearchProject';
import { Dashboard } from './pages/Admin/DashBoard';
import { Task } from './pages/Admin/TaskPage';

// Recoil State
import { userAtom } from './store/userInfoAtom';
import { PrivateRoutes } from './components/PrivateRoutes';

const AppWithState = () => {
  const setProfile = useSetRecoilState(userAtom);
  const userProfile = useRecoilValue(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/user/get', {
          withCredentials: true,
        });
        setProfile(res.data.user);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [setProfile]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isLoading) {
      if (userProfile) {
        // If user is authenticated and trying to access sign-in or sign-up, redirect to home
        if (currentPath === '/sign-in' || currentPath === '/sign-up') {
          navigate('/');
        }
      } else {
        // If user is not authenticated and trying to access protected routes, redirect to sign-in
        if (currentPath !== '/sign-in' && currentPath !== '/sign-up') {
          navigate('/sign-in');
        }
      }
    }
  }, [isLoading, userProfile, navigate]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Routes>
      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/search-projects" element={<SearchProject />} />
        <Route path="/:id/dashboard/*" element={<Dashboard />}>
          <Route path="tasks" element={<Task />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Public Routes */}
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/sign-in" element={<SigninPage />} />
    </Routes>
  );
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppWithState />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;