import { HomePage } from './Pages/HomePage'
import './App.css'
import {Routes,Route} from "react-router-dom"
import { Navbar } from './component/Navbar'
import { AboutPage } from './Pages/AboutPage'
import { AcadamicPage } from './Pages/AcadamicPage'
import { ContactUsPage } from './Pages/ContactUsPage'
import { Signin } from './Pages/Signin'
import {Class9}   from './Pages/Class9Page'
import {Class10}   from './Pages/Class10Page'
import {Class11}   from './Pages/Class11Page'
import {Class12}   from './Pages/Class12Page'
import { Signup } from './Pages/Signup'
import { Footer } from './component/Footer'
import useScrollToTop from './hooks/useScrollToTop'

function App() {
    useScrollToTop();

  return (
    <>
      <div className='flex flex-col justify-center w-screen relative'>
        <div className='bg-black flex justify-center sticky top-0'>
          <Navbar/>
        </div>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/academic" element={<AcadamicPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/class9" element={<Class9 />} />
        <Route path="/class10" element={<Class10 />} />
        <Route path="/class11" element={<Class11 />} />
        <Route path="/class12" element={<Class12 />} />

        <Route path="*" element={<div>Not found Page</div>} />
      </Routes>
      <Footer/>
      </div>
    </>
  )
}

export default App
