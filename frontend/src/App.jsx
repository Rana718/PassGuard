import React from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Manager from "./components/Manager"

function App() {
  

  return (
    <>
      <Navbar/>
      <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
      </div>
      <Footer/>
    </>
  )
}

export default App
