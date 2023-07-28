/* COMPONENTS */
import Home from "./pages/Home"
import Admin from "./pages/Admin"

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
        <p style={{ textAlign: "center" }}> navbar </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer>
        <p style={{ textAlign: "center" }}> footer </p>
      </footer>
    </>
  )
}

export default App
