// import { useState } from 'react'
import {Link} from "react-router-dom";
import './App.css';
import logo from "./images/pic_link_tree.png"



function App() {

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center" }}>
      <img style={{width:"10vw", marginTop:"5vh"}}src={logo}/>
      <h1>Tree Link App</h1>
      <section style={{display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{marginBottom:"10px"}}>{import.meta.env.VITE_APP_SALUDO}</div>
        <Link to="/login">
          <button className="buttons">
            Continue
          </button>
        </Link>
      </section>
      <section className="sectionButtons">
          <Link to="/u/tecnoboy"><button className="otherBut">Example One</button></Link>
          <Link to="/u/leoncio"><button className="otherBut">Example Two</button></Link>
          <Link to="/u/ehinger"><button className="otherBut">Example Three</button></Link>
      </section>
    </div>
  )
}

export default App
