import ButtonUI from "../../global/Buttons/ButtonUI"
import "./General.scss"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import axios from "axios"

function AdminGeneral({ setNav, selected }) {
  const [data, setData] = useState([])
  const [displayNewStory, setDisplayNewStory] = useState(false)
  const [title, setTitle] = useState("")
  const [storyCreated, setStoryCreated] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  /* Recupération des stories au montage */
  useEffect(() => {
    getStories()
    if (searchParams.has("story")) {
      searchParams.delete("story")
      setSearchParams(searchParams)
    }
    if (searchParams.has("scene")) {
      searchParams.delete("story")
      setSearchParams(searchParams)
    }
  }, [])

  /* Animation quand story créee */
  useEffect(() => {
    if (storyCreated) {
      setTimeout(() => {
        setStoryCreated(false)
        setDisplayNewStory(false)
      }, 1500)
    }
  }, [storyCreated])

  /* Creation nouvelle story */
  const handleCreate = () => {
    const data = {
      title,
    }
    axios
      .post("http://localhost:4242/stories", data)
      .then((response) => {
        if (response.status === 200) {
          setStoryCreated(true)
          getStories()
          setTitle("")
        } else {
          console.warn(
            "La requête a réussi, mais avec un statut différent de 200."
          )
        }
      })
      .catch((error) => {
        console.warn("Erreur lors de la requête :", error)

        if (error.response && error.response.data) {
          alert(error.response.data.error) // Affiche le message d'erreur côté front
        }
      })
  }

  /* Annulation creation story */
  const handleQuit = () => {
    setDisplayNewStory(false)
    setTitle("")
  }

  /* Recuperation et affichage des story */
  const getStories = () => {
    axios.get("http://localhost:4242/stories").then((response) => {
      setData(response.data)
      console.info(data)
    })
  }

  /* Suppression story */
  const handleDelete = (deleteId) => {
    const isSure = window.confirm("⚠️ Are you sure to delete this story?")

    if (isSure) {
      axios
        .delete(`http://localhost:4242/stories/${deleteId}`, data)
        .then((response) => {
          if (response.status === 204) {
            alert("✅ story deleted ")
            getStories()
          }
        })
        .catch((err) => console.warn(err))
    }
  }

  const handleModify = (id) => {
    setSearchParams({ story: id, scene: 0 })

    setNav("Edition")
  }

  /* Deploiement story */
  const handleDeploy = (storyId, deployState) => {
    let isSure = null

    if (deployState) {
      isSure = window.confirm("⚠️ Are you sure to deploy your story?")
    } else {
      isSure = window.confirm("⚠️ Are you sure to undeploy your story?")
    }

    if (isSure) {
      const data = {
        deploy: deployState,
      }
      axios
        .put(`http://localhost:4242/deploy/${storyId}`, data)
        .then((response) => {
          if (response.status === 204) {
            alert("✅ Update success")
            // Appelez getStories() ici pour mettre à jour la liste des histoires après un déploiement réussi
            getStories()
          } else {
            console.warn(
              "La requête a réussi, mais avec un statut différent de 204."
            )
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  function formatDateToDDMMYYYY(dateStr) {
    const dateObj = new Date(dateStr)
    const jour = dateObj.getDate().toString().padStart(2, "0")
    const mois = (dateObj.getMonth() + 1).toString().padStart(2, "0")
    const annee = dateObj.getFullYear()
    return `${jour}/${mois}/${annee}`
  }

  return (
    <>
      <div className="adminGeneral">
        <div className="generalTable">
          <table id="generalTab">
            <thead>
              <tr>
                <th className="th__title">Title</th>
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
              {data.map((elem, index) => {
                return (
                  <>
                    <tr key={elem.id}>
                      <td style={{ textAlign: "left" }}>{elem.title}</td>
                      <td>{elem.number_view}</td>
                      <td>{elem.win_rate}</td>
                      <td>{elem.money_earn}</td>
                      <td>{formatDateToDDMMYYYY(elem.creation_date)}</td>
                      <td>{formatDateToDDMMYYYY(elem.last_update)}</td>
                      <td>
                        <ButtonUI
                          width="85px"
                          title={elem.is_deploy ? "deployed" : "deploy"}
                          bgcolor={elem.is_deploy ? "#3f7841" : "grey"}
                          onClick={() => handleDeploy(elem.id, !elem.is_deploy)}
                        />
                      </td>
                      <td>
                        {" "}
                        <ButtonUI
                          width="85px"
                          title={"Modify"}
                          bgcolor={"#3e86bb"}
                          onClick={() => handleModify(elem.id)}
                        />
                      </td>
                      <td>
                        {" "}
                        <ButtonUI
                          width="85px"
                          title={"Delete"}
                          bgcolor={"#902B00"}
                          onClick={() => handleDelete(elem.id)}
                        />
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="tableSeparator">
          <div className="lineSeparator"></div>
        </div>
        <div className="generalAddButton">
          {displayNewStory ? (
            <>
              {storyCreated ? (
                <p
                  style={{
                    color: "black",
                    fontSize: "14px",
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Success !{" "}
                </p>
              ) : (
                <input
                  type="text"
                  placeholder="New story title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              )}
              <ButtonUI
                title={"save"}
                bgcolor={"#3f7841"}
                className={`nav__item ${
                  selected === "Edition" ? "active" : ""
                }`}
                onClick={handleCreate}
              />
              <ButtonUI
                title={"cancel"}
                bgcolor={"#902b00"}
                className={`nav__item ${
                  selected === "Edition" ? "active" : ""
                }`}
                onClick={handleQuit}
              />
            </>
          ) : (
            <>
              <ButtonUI
                title={"Add"}
                bgcolor={"#3e86bb"}
                className={`nav__item ${
                  selected === "Edition" ? "active" : ""
                }`}
                onClick={() => setDisplayNewStory(true)}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminGeneral
