import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
export default function Layout({userDate , setuserDate}) {
  let navigate = useNavigate();
  function logOut(){
    localStorage.removeItem('userToken');
    setuserDate(null);
    navigate('/login');
  }
  return <>
  <Navbar logOut={logOut} userDate={userDate}/>
  <div className=' container'>
    <Outlet></Outlet>
    </div>
  <Footer/>
  </>
}
