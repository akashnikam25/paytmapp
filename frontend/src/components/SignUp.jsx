import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const SignUp = ()=>{
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()
    const [userName, setUserName] = useState()
    const navigator = useNavigate();

    return <>
     <div>
        <h1>Sign Up</h1>
        <label htmlFor="FirstName">First Name:</label><input type="text" placeholder='John' onChange={(e)=>{
            setFirstName(e.target.value)
        }} /><br /><br />
        <label htmlFor="LastName">Last Name:</label><input type="text" placeholder='Doe' onChange={(e)=>{
            setLastName(e.target.value)
        }}/><br /><br />
        <label htmlFor="Email">Email:</label><input type="email" placeholder='johndoe@example.com' onChange={(e)=>{
            setUserName(e.target.value)
        }}/><br /><br />
        <label htmlFor="Password">Password:</label><input type="password" onChange={(e)=>{
            setPassword(e.target.value)
        }} /><br /><br />
        <button type="submit" onClick={()=>{
            axios({
                url:"http://localhost:3000/api/v1/user/signup",
                method:"POST",
                data:{
                    username:userName,
                    firstName:firstName,
                    lastName:lastName,
                    password:password
                }
            }).then((res)=>{
                console.log(res.data.authorization)
                navigator("/dashboard")
                localStorage.setItem('authToken', res.data.authorization);


            }).catch((error)=>{
               
                console.log("error",error)
            })
        }}>Sign Up</button>

        <div>
            Already have an account? <a href="/signin">Sign In</a>
        </div>
     </div>
    </>
}