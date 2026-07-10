import SignUpPage from "./pages/SignUpPage"
import {Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VisitorPage from "./pages/VisitorPage"
import { checkAuth } from "./redux/userSlice"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function App() {
   
  const dispatch = useDispatch()
  const {isAuthenticated,isCheckingAuth} = useSelector((state)=>state.users)

  const RedirectAuthenticateUser = ({children})=>{
    if(isAuthenticated){
      return <Navigate to="/dashboard"/>
    }
    return children 
  }

  const ProtectedRoute = ({children}) => {
    
    if(!isAuthenticated){
      return <Navigate to="/"/>
    }
    return children 
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden  bg-linear-to-br from-gray-300 via-gray-500 to-blue-950">
      <Routes>
        <Route path="/" element={<RedirectAuthenticateUser><SignUpPage/></RedirectAuthenticateUser>}/>
        <Route path="/signin" element={<RedirectAuthenticateUser><LoginPage/></RedirectAuthenticateUser>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="/visitor-page" element={<VisitorPage/>}/>
      </Routes>
     </div> 
    </>
  )
}

export default App
