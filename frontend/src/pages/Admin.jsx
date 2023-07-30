/* Library */
import { useState } from "react"

/* Components */
import AdminEdition from "../components/admin/Edition/Edition"
import AdminGeneral from "../components/admin/general/General"
import AdminStats from "../components/admin/Statistiques/Stats"
import NavAdmin from "../components/admin/NavAdmin"

/* Styles */
import "./Admin.scss"

function Admin() {
  const [selectedNav, setSelectedNav] = useState("general")
  return (
    <>
      <section className="admin">
        <section className="admin__nav">
          <NavAdmin setNav={setSelectedNav} selected={selectedNav} />
        </section>
        <section className="admin__content">
          {selectedNav === "General" && <AdminGeneral />}
          {selectedNav === "Edition" && <AdminEdition />}
          {selectedNav === "Stats" && <AdminStats />}
        </section>
      </section>
    </>
  )
}

export default Admin
