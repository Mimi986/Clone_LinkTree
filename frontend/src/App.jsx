import SignUpPage from "./pages/SignUpPage"
import {Routes,Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import VisitorPage from "./pages/VisitorPage"

function App() {
  

  return (
    <>
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden  bg-linear-to-br from-gray-300 via-gray-500 to-blue-950">
      <Routes>
        <Route path="/" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/visitor-page" element={<VisitorPage/>}/>
      </Routes>
     </div> 
    </>
  )
}

export default App
