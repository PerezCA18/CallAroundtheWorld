import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { StickyNavbar } from './components/Navbar'
import WorldMap from './wolrdMap'
import AimPage from './pages/AimPage'
import AboutUsPage from './pages/AboutUs'
function Home(){
  return (
    <div className='App w-full flex justify-center items-center'>
      <WorldMap></WorldMap>
    </div>
  )
}

function App() {
//  const [count, setCount] = useState(0)

  return (
    <Router>
      <StickyNavbar ></StickyNavbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/aim/:country" element={<AimPage />}></Route>
        <Route path="/callaroundtheworld" element={<AboutUsPage />}></Route>
      </Routes>
      </Router>
    
  )
}

export default App
