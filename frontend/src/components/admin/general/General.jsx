import ButtonUI from "../../global/Buttons/ButtonUI"
import "./General.scss"
import { useEffect, useState } from "react"
import axios from "axios"

function AdminGeneral({ setNav, selected }) {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4242/stories").then((response) => {
      setData(response.data)
      console.info(data)
    })
  }, [])

  const handleDelete = () => {
    axios.delete("http://localhost:4242/stories")
  }

  const handleModify = () => {}

  const handleDeploy = () => {
    axios
      .put("http://localhost:4242/stories")
      .then((response) => {
        alert("Success")
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <>
      <div className="adminGeneral">
        <div className="generalTable">
          <table id="generalTab">
            <thead>
              <tr>
                <th>Title</th>
                <th>Views</th>
                <th>Rating</th>
                <th>Euros</th>
                <th>Creation</th>
                <th>Last Update</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{}</td>
                <td>333</td>
                <td>5*</td>
                <td>50€</td>
                <td>20/07/2023</td>
                <td>21/07/2023</td>
                <td>
                  {" "}
                  <ButtonUI
                    title={"Deploy"}
                    bgcolor={"#3f7841"}
                    onClick={handleDeploy}
                  />
                </td>
                <td>
                  {" "}
                  <ButtonUI
                    title={"Modify"}
                    bgcolor={"#3e86bb"}
                    onClick={handleModify}
                  />
                </td>
                <td>
                  {" "}
                  <ButtonUI
                    title={"Delete"}
                    bgcolor={"#902B00"}
                    onClick={handleDelete}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tableSeparator">
          <div className="lineSeparator"></div>
        </div>
        <div className="generalAddButton">
          <ButtonUI
            title={"Add"}
            bgcolor={"#3f7841"}
            className={`nav__item ${selected === "Edition" ? "active" : ""}`}
            onClick={() => setNav("Edition")}
          />
        </div>
      </div>
    </>
  )
}

export default AdminGeneral
