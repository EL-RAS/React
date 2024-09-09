import React, {useState} from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import "./style.css"

export default function App() {
    const [mode, setmode] = useState(true);

    function handeleMode () {
        setmode((prevMode) => !prevMode);
    }

    return (
        <div className="container" >
            <Navbar darkMode={mode} toggleDarkMode={handeleMode}/>
            <Main darkMode={mode}/>
        </div>
    )
}