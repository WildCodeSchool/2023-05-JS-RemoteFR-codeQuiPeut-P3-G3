/* Library */
import { useState } from "react"

/* Components */
import AdminEdition from "../components/admin/Edition/Edition"
import AdminGeneral from "../components/admin/general/General"
import AdminStats from "../components/admin/Statistiques/Stats"
import NavAdmin from "../components/admin/NavAdmin"
import { EditionContextProvider } from "../services/contexts/editionContext"

/* Styles */
import "./Admin.scss"

function Admin() {
  const [selectedNav, setSelectedNav] = useState("General")
  return (
    <>
      <section className="admin">
        <section className="admin__nav">
          <NavAdmin setNav={setSelectedNav} selected={selectedNav} />
        </section>
        <EditionContextProvider>
          <section className="admin__content">
            {selectedNav === "General" && (
              <AdminGeneral setNav={setSelectedNav} selected={selectedNav} />
            )}
            {selectedNav === "Edition" && <AdminEdition />}
            {selectedNav === "Stats" && <AdminStats />}
          </section>
        </EditionContextProvider>
      </section>
    </>
  )
}

export default Admin
