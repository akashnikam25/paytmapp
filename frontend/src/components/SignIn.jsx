import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import '../App.css'
import axios from 'axios'

export const SignIn = ()=>{
    const [password, setPassword] = useState()
    const [userName, setUserName] = useState()
    const navigator = useNavigate();
    return <>
      <div>
        <h1>Sign In</h1>
        <label htmlFor="Email">Email:</label><input type="email" placeholder='johndoe@example.com' onChange={(e)=>{
            setUserName(e.target.value)
        }}/><br /><br />
        <label htmlFor="Password">Password:</label><input type="password" onChange={(e)=>{
            setPassword(e.target.value)
        }} /><br /><br />

        <button type="submit" onClick={()=>{
            axios({
                url:"http://localhost:3000/api/v1/user/signin",
                method:"POST",
                data:{
                    username:userName,
                    password:password
                }
            }).then((res)=>{
                console.log(res.data.authorization)
                navigator("/dashboard")
                //localStorage['header'] = res.data.authorization
                localStorage.setItem('authToken', res.data.authorization);
            }).catch((error)=>{
                console.log(error)
            })
        }}> Sign In</button>
         <div>
            Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </>
}