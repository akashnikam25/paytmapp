import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Dashboard } from './components/DashBoard'
import { SendMoney } from "./components/SendMoney";

function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/send" element={<SendMoney/>}></Route>
    </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
