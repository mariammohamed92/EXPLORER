//import logo from './logo.svg';
import './App.css';
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tv from './Components/Tv/Tv';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile  from './Components/Profile/Profile';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import jwtDecode from 'jwt-decode';
import {useEffect, useState} from 'react';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout';
import { Offline} from 'react-detect-offline';

function App() {

useEffect(()=>{
  if(localStorage.getItem('userToken')!==null)
  {
    saveUserDate();
  }
},[])


const [userDate, setuserDate] = useState(null);

function saveUserDate(){
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken=jwtDecode(encodedToken);
  setuserDate(decodedToken);

}
  let routers=createBrowserRouter([
    {
      path:'/' ,element:<Layout setuserDate={setuserDate} userDate={userDate}/> ,children:[
      
      {index:true , element: <ProtectedRout userDate={userDate}> <Home/> </ProtectedRout>},
      {path:'movies' , element: <ProtectedRout userDate={userDate}> <Movies/> </ProtectedRout>},
      {path:'people' , element: <ProtectedRout userDate={userDate}> <People/> </ProtectedRout>},
      {path:'itemdetails/:id/:media_type' , element: <ProtectedRout userDate={userDate}> <ItemDetails/> </ProtectedRout>},
      {path:'profile' , element: <ProtectedRout userDate={userDate}> <Profile userData={userDate} /></ProtectedRout>},
      {path:'tv' , element: <ProtectedRout userDate={userDate}> <Tv/></ProtectedRout>},
      {path:'login' , element: <Login saveUserDate={saveUserDate}/>},
      {path:'register' , element: <Register/>},
      {path:'*' , element: <Login/>}

  ]}
  ])

  return<>
  
  <div>
    <Offline><div className='offline'>You Are Offline</div></Offline>
  </div>
   <RouterProvider router={routers}/> 
  </>
}

export default App;
