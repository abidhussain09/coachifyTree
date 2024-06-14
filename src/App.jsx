import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './component/Navbar'

function App() {

  return (
    <>
      <div className='flex flex-col justify-center w-screen'>
        <div className='bg-black w-screen flex justify-center'>
          <Navbar />
        </div>
        <div>
          
        </div>
      </div>
    </>
  )
}

export default App
