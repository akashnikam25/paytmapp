import { useState } from 'react'
import '../App.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Heading } from './Heading';
import { SubHeading } from './SubHeading';
import { InputBox } from './Inputbox';
import { Button } from './Button';
import { BottomWarning } from './BottomWarning';

export const SignUp = ()=>{
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()
    const [userName, setUserName] = useState()
    const navigator = useNavigate();
   return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={(e)=>{
            setFirstName(e.target.value)
            console.log(firstName)
        }} />
        <InputBox placeholder="Doe" label={"Last Name"} onChange={(e)=>{
            setLastName(e.target.value)
        }}/>
        <InputBox placeholder="johndow@gmail.com" label={"Email"}  onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <div className="pt-4">
          <Button label={"Sign up"}  onClick={()=>{
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
        }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}