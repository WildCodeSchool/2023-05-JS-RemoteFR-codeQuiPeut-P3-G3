/* COMPONENTS */
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import NavBar from "./components/global/NavBar"
import Profile from "./pages/Profile"
import Games from "./pages/Games"

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
        <NavBar />
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
    </>
  )
}

export default App
