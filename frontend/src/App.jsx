/* COMPONENTS */
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Navbar from "./components/global/Navbar"
import Profile from "./pages/Profile"
import Games from "./pages/Games"
import Register from "./pages/Register"
import Login from "./pages/Login"

/* PACKAGES */
import { Routes, Route } from "react-router-dom"

/* CSS */
import "./App.scss"

function App() {
  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        {/* -> Navbar à ajouter ici */}
        <Navbar />
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
