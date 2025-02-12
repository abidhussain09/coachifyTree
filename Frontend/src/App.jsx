import { HomePage } from './Pages/HomePage'
import './App.css'
import {Routes,Route} from "react-router-dom"
import { Navbar } from './component/Navbar'
import { AboutPage } from './Pages/AboutPage'
import { AcadamicPage } from './Pages/AcadamicPage'
import { ContactUsPage } from './Pages/ContactUsPage'
import { Signin } from './Pages/Signin'
import  ForgetPassword  from './Pages/ForgetPassword'
import {Class9}   from './Pages/Class9Page'
import {Class10}   from './Pages/Class10Page'
import {Class11}   from './Pages/Class11Page'
import {Class12}   from './Pages/Class12Page'
import { Signup } from './Pages/Signup'
import {Loader} from './Pages/Loader'
import { Signout } from './Pages/Signout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './component/Footer'
import { JeePage } from './Pages/JeePage'
import { NeetPage } from './Pages/NeetPage'
import useScrollToTop from './hooks/useScrollToTop'
import { Dashboard } from './Pages/Dashboard'
import { ProtectedRoute } from './component/ProtectedRoute'
import ResetPassword from './Pages/ResetPassword'

function App() {
    useScrollToTop();

  return (
    <>
      <div className='flex flex-col justify-center w-screen relative'>
        <div className='bg-black flex justify-center sticky top-0'>
          <Navbar/>
        </div>
        <div className='sm:px-0 px-[30px]'>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/academic" element={<AcadamicPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signout" element={<Signout/>} />
        <Route path="/resetPassword" element={<ResetPassword/>}/> 
        <Route path="/comingSoon" element={<Loader/>} />
        <Route path="academic/class9" element={<ProtectedRoute children={<Class9/>}/>} />
        <Route path="academic/class10" element={<ProtectedRoute children={<Class10/>}/>} />
        <Route path="academic/class11" element={<ProtectedRoute children={<Class11/>}/>} />
        <Route path="academic/class12" element={<ProtectedRoute children={<Class12/>}/>} />
        <Route path="academic/Jee" element={<ProtectedRoute children={<JeePage/>}/>} />
        <Route path="academic/Neet" element={<ProtectedRoute children={<NeetPage/>}/>} />
        <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard/>}/>} />
        <Route path="*" element={<div>Not found Page</div>} />
      </Routes>
      </div>
      <ToastContainer />
      <Footer/>
      </div>
    </>
  )
}

export default App
