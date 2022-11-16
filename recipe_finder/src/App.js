import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {MyContext} from './context';
import AppNavbar from "./components/Navbar/navbar";
import HomePage from './pages/Home/home';
import NotFoundPage from './pages/NotFound/notfound';
import LoginPage from './pages/Login/login';
import SignUpPage from './pages/SignUp/signup';
import FavoritesPage from './pages/Favorites/favorites';

function App() {
  const {user, setUser} = useContext(MyContext);

  useEffect(() => {
  const autoLogin = async() => {
  const response = await fetch(`${window.env.API_URL}/auto-login`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      }
     });
  
    const data = await response.json();
    setUser(data)
  }

  autoLogin()
  
  }, []);

  return (
      <Router>
        <AppNavbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            {!user && (
              <>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
              </>
            )}
            {user && <Route path="/favorites" element={<FavoritesPage/>} />}
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
      </Router>
  );
}


export default App;
