import React , { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Helmet } from 'react-helmet';
export default function Login({saveUserDate}) {
  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([])
  const [isLoading, setisLoading] = useState(false);
const [error, setError] = useState('');
const [user, setUser] = useState({
  email:'',
  password:'',
})
function getUserDate(eventInfo){
  let myUser={...user};
  myUser[eventInfo.target.name]=eventInfo.target.value;
  setUser(myUser);
  console.log(myUser);
}

async function sendloginDateToApi(){
let {data} =  await axios.post(`https://sticky-note-fe.vercel.app/signin`,user);
if(data.message==='success'){
  localStorage.setItem('userToken',data.token);
  saveUserDate();
  setisLoading(false);
  navigate("/");
}
else{
  setisLoading(false);
  setError(data.message)
}
}
function submitloginForm(e)
{
  e.preventDefault();
  setisLoading(true);
  let validation = validateloginForm();
  if(validation.error)
  {
    setisLoading(false);
    seterrorList(validation.error.details)
  }
  else{
    sendloginDateToApi();

  }
}
function validateloginForm(){
  let scheme= Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
   password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/).min(3).max(10).required(),

  });
  return scheme.validate(user,{abortEarly:false});
}
return(
<>
<Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Login Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

{ error.length>0 ? (
<div className=' alert alert-danger my-2'>{error}</div>
):(
  ""
  )}

  <form onSubmit={submitloginForm}>

<label htmlFor='email'>email:</label>
<input onChange={getUserDate} type="email" className=' form-control my-input my-2' name="email" id="email"></input>
{ 
  errorList.filter((err)=>err.context.label==='email')[0]?<div className=' alert alert-danger my-1'>
    <p>"email" must be a valid email</p>
  </div>:''
}
<label htmlFor='password'>password :</label>
<input onChange={getUserDate} type="password" className=' form-control my-input my-1' name="password" id="password"></input>

 {errorList.filter((err)=>err.context.label==='password')[0]?<div className=' alert alert-danger my-1'>
   <p>Password invalid must be start char captial or small </p>
 </div>:''
}
<button type='submit' className=' btn btn-info'>{isLoading===true?<i className=' fas fa-spinner fa-spin'></i>:'Register'}</button> 
  </form>
</>
)}
