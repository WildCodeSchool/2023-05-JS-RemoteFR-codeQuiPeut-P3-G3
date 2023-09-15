/* COMPONENTS */
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Navbar from "./components/global/Navbar"
import Profile from "./pages/Profile"
import Games from "./pages/Games"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Shop from "./pages/Shop"
import ProtectedRoutes from "./ProtectedRoutes"
import ProtectedUserRoute from "./ProtectedUserRoute"
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
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedUserRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
    </>
  )
}

export default App
