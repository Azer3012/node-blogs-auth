
import {Routes,Route,Navigate} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Blog from './pages/BlogDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dasboard';
function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard"/>} />
      <Route path='/dashboard' element={<Dashboard/>} />

      <Route path='/auth/login' element={<Login/>} />
      <Route path='/auth/registration' element={<Registration/>} />
      <Route path='/blogs'element={<Blogs/>} /> 
      <Route path='/blog/:id'element={<Blog/>} /> 
      <Route path='*'element={<h1>404 Not found</h1>} /> 
    </Routes>
   
  );
}

export default App;
