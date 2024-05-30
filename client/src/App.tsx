import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import NoPage from './pages/noPage';
import Home from './pages/Home'

function App() {

  const fetchFunction = () => {

    console.log("Fetching request")
    
    axios.post('http://192.168.8.100:3333/', { withCredentials: true })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("End")
      });
    
    
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" >
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
/*
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
*/
export default App;