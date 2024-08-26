import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import App from './App';
import Login from './Login';

const MyRoutes = () => {
   return(
       <BrowserRouter>
        <Routes>
           <Route element = { <App></App> }  path="/home" />
           <Route element = { <Login></Login> }  path="/" exact />
        </Routes>
       </BrowserRouter>
   )
}

export default MyRoutes;