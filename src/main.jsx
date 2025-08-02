import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ResourceProvider from './context/ResourceContext.jsx'
import './index.css'
import App from './App.jsx'
import Signup from './auth/Signup.jsx'
import Login from './auth/Login.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import CreateProject from './pages/CreateProject.jsx'
import CreateTask from './pages/CreateTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ResourceProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route path='/auth/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/auth/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/auth/project' element={<PrivateRoute><CreateProject/></PrivateRoute>}/>
        <Route path='/auth/task' element={<PrivateRoute><CreateTask/></PrivateRoute>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </ResourceProvider>
</StrictMode>
)
