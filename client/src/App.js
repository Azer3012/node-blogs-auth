
import {Routes,Route,Navigate} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Blog from './pages/BlogDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dasboard';
import MyLayout from './Layout';
import Chat from './pages/Chat';
import CreateBlog from './pages/CreateBlog';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard"/>} />
      <Route path='/auth/login' element={<Login/>} />
      <Route path='/auth/registration' element={<Registration/>} />
      <Route path='/auth/forgot-password' element={<ForgotPassword/>} />
      <Route path='/auth/reset/:resetToken' element={<ResetPassword/>} />
      <Route path='/' element={<MyLayout/>}>
        <Route path='dashboard' element={<Dashboard/>} />
        <Route path='blogs'element={<Blogs/>} /> 
        <Route path='create-blog'element={<CreateBlog/>} /> 
        <Route path='blog/:id'element={<Blog/>} /> 
        <Route path='chat'element={<Chat/>} /> 
        <Route path='*'element={<h1>404 Not found</h1>} /> 
      </Route>
     
    </Routes>
   
  );
}

export default App;
