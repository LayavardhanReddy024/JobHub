import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserPage from './Pages/UserPage';
import ProfileDashboard from './Components/UserPageComponents/ProfileDashboard';
import VendorPage from './Pages/Vendor';
import VendorProfile from './Components/VendorComponents/VendorProfile';
import AdminLogin from './Pages/AdminLogin';
import AdminPage from './Pages/AdminPage';

function AppWithKeyListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        navigate('/superadmin-login-xyz123'); // Redirect to hidden admin login page
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/UserPage" element={<UserPage />} />
      <Route path="/ProfileDashboard" element={<ProfileDashboard />} />
      <Route path='/VendorPage' element={<VendorPage />} />
      <Route path="/VendorProfile" element={<VendorProfile />} />
      <Route path='/superadmin-login-xyz123' element={<AdminLogin />} />
      <Route path='/AdminPage' element={<AdminPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWithKeyListener />
    </BrowserRouter>
  );
}

export default App;
