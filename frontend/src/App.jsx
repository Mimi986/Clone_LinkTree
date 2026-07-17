import SignUpPage from "./pages/SignUpPage"
import {Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VisitorPage from "./pages/VisitorPage"
import { checkAuth } from "./redux/userSlice"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Header from "./components/Header"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

const RedirectAuthenticateUser = ({children})=>{
    const {isAuthenticated,authChecked} = useSelector((state)=>state.users)
    if(isAuthenticated){
      return <Navigate to="/dashboard"/>
    }
    return children 
  }

  const ProtectedRoute = ({children}) => {
      const {isAuthenticated,authChecked} = useSelector((state)=>state.users)
    if(!authChecked){
      return <div>Loading ...</div>
    }
    if(!isAuthenticated){
      return <Navigate to="/"/>}
    return children 
  }

function App() {
   
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
    <Header></Header>
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden  bg-linear-to-br from-gray-300 via-gray-500 to-blue-950">
      <Routes>
        <Route path="/" element={<RedirectAuthenticateUser><SignUpPage/></RedirectAuthenticateUser>}/>
        <Route path="/signin" element={<RedirectAuthenticateUser><LoginPage/></RedirectAuthenticateUser>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
         <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
         <Route path="/visitor-page/:name" element={<VisitorPage/>}/>
      </Routes>
     </div> 
    </>
  )
}

export default App
