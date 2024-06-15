import { HeroSection } from './component/HeroSection'
import './App.css'
import {Routes,Route} from "react-router-dom"
import { Navbar } from './component/Navbar'
import { AboutPage } from './Pages/AboutPage'
import { AcadamicPage } from './Pages/AcadamicPage'
import { ContactUsPage } from './Pages/ContactUsPage'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Footer } from './component/Footer'

function App() {

  return (
    <>
      <div className='flex flex-col justify-center w-screen'>
        <div className='bg-black flex justify-center '>
          <Navbar />
        </div>
        <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/academic" element={<AcadamicPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>} />
        <Route path="*" element={<div>Not found Page</div>} />
      </Routes>
      <Footer/>
      </div>
    </>
  )
}

export default App
