import React from 'react'
import { Helmet } from 'react-helmet';
export default function Profile({userData}) {
    let {first_name , last_name ,age,email}=userData;
    
  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Profile Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <h4>Name : {first_name} {last_name}</h4>
  <h4>Age : {age} </h4>
  <h4>email : {email}</h4>

  </> 
}
