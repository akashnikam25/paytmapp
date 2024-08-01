import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Dashboard } from './components/DashBoard'

function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
   </BrowserRouter>

    </>
  )
}

export default App
