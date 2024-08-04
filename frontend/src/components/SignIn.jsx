import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./Inputbox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";

export const SignIn = ()=>{
    const [password, setPassword] = useState()
    const [userName, setUserName] = useState()
    const navigator = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="JohnDoe@gmail.com" label={"Email"} onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={()=>{
            axios({
                url:"http://localhost:3000/api/v1/user/signin",
                method:"POST",
                data:{
                    username:userName,
                    password:password
                }
            }).then((res)=>{
                navigator("/dashboard")
                localStorage.setItem('authToken', res.data.authorization);
            }).catch((error)=>{
                console.log(error)
            })
        }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
    
}