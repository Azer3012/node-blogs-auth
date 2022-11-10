
import {Routes,Route} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Blog from './pages/BlogDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
function App() {
  return (
    <Routes>
      <Route index element={<h1>home pages</h1>} />
      <Route path='/auth/login' element={<Login/>} />
      <Route path='/auth/registration' element={<Registration/>} />
      <Route path='/blogs'element={<Blogs/>} /> 
      <Route path='/blog/:id'element={<Blog/>} /> 
      <Route path='*'element={<h1>404 Not found</h1>} /> 
    </Routes>
   
  );
}

export default App;
