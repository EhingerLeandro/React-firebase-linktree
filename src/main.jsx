import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginView from "./routes/LoginView.jsx";
import DashboardView from "./routes/DashboardView.jsx";
import EditProfileView from "./routes/EditProfileView.jsx";
import SignOutView from "./routes/SignOutView.jsx";
import PublicProfileView from "./routes/PublicProfileView.jsx";
import ChooseUserView from "./routes/ChooseUserView.jsx";

/*Estados predefinidos
2: login completo
3: Login pero sin registro
4: No estas logueado
5: Ya existe username
6: Nuevo username, click para continuar 
7: User doesn't exist */

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/dashboard" element={<DashboardView/>}/>
      <Route path="/dashboard/profile" element={<EditProfileView/>}/>
      <Route path="/signout" element={<SignOutView/>}/>
      <Route path="u/:username" element={<PublicProfileView/>}/>
      <Route path="/choose-username" element={<ChooseUserView/>}/>
    </Routes>
  </BrowserRouter>
)
