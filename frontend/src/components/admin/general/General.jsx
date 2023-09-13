import ButtonUI from "../../global/Buttons/ButtonUI"
import "./General.scss"
import { jdrCardData } from "../../../pages/Home"

function AdminGeneral() {
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
              {jdrCardData.map((jdrData, index) => (
                <tr key={index}>
                  <td>{jdrData.jdrName}</td>
                  <td>333</td>
                  <td>5*</td>
                  <td>50€</td>
                  <td>20/07/2023</td>
                  <td>21/07/2023</td>
                  <td>
                    {" "}
                    <ButtonUI title={"Deploy"} bgcolor={"#3f7841"} />
                  </td>
                  <td>
                    {" "}
                    <ButtonUI title={"Modify"} bgcolor={"#3e86bb"} />
                  </td>
                  <td>
                    {" "}
                    <ButtonUI title={"Delete"} bgcolor={"#902B00"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tableSeparator">
          <div className="lineSeparator"></div>
        </div>
        <div className="generalAddButton">
          <ButtonUI title={"Add"} bgcolor={"#3f7841"} />
        </div>
      </div>
    </>
  )
}

export default AdminGeneral
