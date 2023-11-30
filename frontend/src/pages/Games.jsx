import React, { useState, useEffect } from "react"
import axios from "axios"
import JdrCard from "../components/global/JdRcard"
import downarrow from "../assets/images/downarrow.png"
import Footer from "../components/global/Footer"
import "./Games.scss"
import "../components/home/Caroussel.scss"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [jdrCardData, setJdrCardData] = useState([])
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4242/card")
      setJdrCardData(response.data)
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [startIndexAllGames, setStartIndexAllGames] = useState(0)
  const [startIndexFantastic, setStartIndexFantastic] = useState(0)
  const [startIndexHorror, setStartIndexHorror] = useState(0)
  const [startIndexWestern, setStartIndexWestern] = useState(0)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)

  const handleNext = (section) => {
    switch (section) {
      case "allGamesSection":
        setStartIndexAllGames(
          (startIndexAllGames + (isMobile ? 1 : 2)) % jdrCardData.length
        )
        break
      case "fantasticGamesSection":
        setStartIndexFantastic(
          (startIndexFantastic + (isMobile ? 1 : 2)) % jdrCardData.length
        )
        break
      case "horrorGamesSection":
        setStartIndexHorror(
          (startIndexHorror + (isMobile ? 1 : 2)) % jdrCardData.length
        )
        break
      case "westernGamesSection":
        setStartIndexWestern(
          (startIndexWestern + (isMobile ? 1 : 2)) % jdrCardData.length
        )
        break
      default:
        break
    }
  }

  const handlePrevious = (section) => {
    switch (section) {
      case "allGamesSection":
        setStartIndexAllGames(
          (startIndexAllGames - (isMobile ? 1 : 2) + jdrCardData.length) %
            jdrCardData.length
        )
        break
      case "fantasticGamesSection":
        setStartIndexFantastic(
          (startIndexFantastic - (isMobile ? 1 : 2) + jdrCardData.length) %
            jdrCardData.length
        )
        break
      case "horrorGamesSection":
        setStartIndexHorror(
          (startIndexHorror - (isMobile ? 1 : 2) + jdrCardData.length) %
            jdrCardData.length
        )
        break
      case "westernGamesSection":
        setStartIndexWestern(
          (startIndexWestern - (isMobile ? 1 : 2) + jdrCardData.length) %
            jdrCardData.length
        )
        break
      default:
        break
    }
  }

  const handleClick = (storyId) => {
    navigate(`/game?story=${storyId}`)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="menu-container">
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open)
          }}
        >
          <h1 className="gamesh1">GAMES</h1>
          <button className="type">
            type <img className="flechezer" src={downarrow} alt="" />
          </button>
        </div>
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul className="dropdown-list">
            <DropdownItem text={"All Games"} anchor={"allGamesSection"} />
            <DropdownItem text={"Fantastic"} anchor={"fantasticGamesSection"} />
            <DropdownItem text={"Horror"} anchor={"horrorGamesSection"} />
            <DropdownItem text={"Medieval"} anchor={"medievalGamesSection"} />
            <DropdownItem text={"Cyberpunk"} anchor={"cyberpunkGamesSection"} />
            <DropdownItem
              text={"Post apocalyptique"}
              anchor={"postapoGamesSection"}
            />
            <DropdownItem text={"Western"} anchor={"westernGamesSection"} />
          </ul>
        </div>
      </div>

      <main className="home__content">
        {jdrCardData.length > 0 && (
          <section className="home__content__games" id="allGamesSection">
            <div className="allGames">
              <h1 className="All">ALL</h1>
              <h2 className="gamezzz">GAMES</h2>
            </div>
            <div className="jdrCardApp">
              <div className="pagination">
                <button className="boutonPrev" onClick={handlePrevious}>
                  <img src={previous} alt="" />
                </button>
              </div>
              {jdrCardData
                .slice(
                  startIndexAllGames,
                  startIndexAllGames + (isMobile ? 1 : 2)
                )
                .map((jdr, index) => (
                  <div key={jdr.idcard} className="carourou">
                    <JdrCard
                      key={jdr.idcard}
                      {...jdr}
                      handleClick={() => handleClick(jdr.storyId)}
                    />
                  </div>
                ))}
              <div className="pagination">
                <button
                  className="boutonNext"
                  onClick={() => handleNext("allGamesSection")}
                >
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Ajoute les sections supplémentaires en fonction des catégories de jeux (fantastic, horror, etc.) */}
        {/* Assure-toi de mettre à jour startIndex selon la catégorie de chaque section. */}
        {jdrCardData.length > 0 && (
          <section className="home__content__games" id="fantasticGamesSection">
            <div className="allGames">
              <h1 className="All">"FANTASTIC</h1>
              <h2 className="gamezzz">GAMES"</h2>
            </div>
            <div className="jdrCardApp">
              <div className="pagination">
                <button className="boutonPrev" onClick={handlePrevious}>
                  <img src={previous} alt="" />
                </button>
              </div>
              {jdrCardData
                .slice(
                  startIndexFantastic,
                  startIndexFantastic + (isMobile ? 1 : 2)
                )
                .map((jdr, index) => (
                  <div key={jdr.idcard} className="carourou">
                    {jdr.jdrCategory === "Fantastic" && (
                      <JdrCard
                        {...jdr}
                        handleClick={() => handleClick(jdr.storyId)}
                      />
                    )}
                  </div>
                ))}

              <div className="pagination">
                <button
                  className="boutonNext"
                  onClick={() => handleNext("fantasticGamesSection")}
                >
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </section>
        )}

        {jdrCardData.length > 0 && (
          <section className="home__content__games" id="horrorGamesSection">
            <div className="allGames">
              <h1 className="All">"HORROR</h1>
              <h2 className="gamezzz">GAMES"</h2>
            </div>
            <div className="jdrCardApp">
              <div className="pagination">
                <button className="boutonPrev" onClick={handlePrevious}>
                  <img src={previous} alt="" />
                </button>
              </div>
              {jdrCardData
                .slice(startIndexHorror, startIndexHorror + (isMobile ? 1 : 2))
                .map((jdr, index) => (
                  <div key={jdr.idcard} className="carourou">
                    {jdr.jdrCategory === "Horror" && (
                      <JdrCard
                        {...jdr}
                        handleClick={() => handleClick(jdr.storyId)}
                      />
                    )}
                  </div>
                ))}

              <div className="pagination">
                <button
                  className="boutonNext"
                  onClick={() => handleNext("horrorGamesSection")}
                >
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </section>
        )}
        {jdrCardData.length > 0 && (
          <section className="home__content__games" id="westernGamesSection">
            <div className="allGames">
              <h1 className="All">"WESTERN</h1>
              <h2 className="gamezzz">GAMES"</h2>
            </div>
            <div className="jdrCardApp">
              <div className="pagination">
                <button className="boutonPrev" onClick={handlePrevious}>
                  <img src={previous} alt="" />
                </button>
              </div>
              {jdrCardData
                .slice(
                  startIndexWestern,
                  startIndexWestern + (isMobile ? 1 : 2)
                )
                .map((jdr, index) => (
                  <div key={jdr.idcard} className="carourou">
                    {jdr.jdrCategory === "Western" && (
                      <JdrCard
                        {...jdr}
                        handleClick={() => handleClick(jdr.storyId)}
                      />
                    )}
                  </div>
                ))}

              <div className="pagination">
                <button
                  className="boutonNext"
                  onClick={() => handleNext("westernGamesSection")}
                >
                  <img src={next} alt="" />
                </button>
              </div>
            </div>
          </section>
        )}
        <section className="home__content__games"></section>
      </main>

      <Footer />
    </>
  )
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <a href={`#${props.anchor}`}>{props.text}</a>
    </li>
  )
}
