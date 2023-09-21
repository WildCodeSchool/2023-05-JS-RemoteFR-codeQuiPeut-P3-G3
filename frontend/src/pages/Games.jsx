import React, { useState, useEffect } from "react"
import axios from "axios"
import JdrCard from "../components/global/JdRcard"
import downarrow from "../assets/images/downarrow.png"
import Footer from "../components/global/Footer"

import "./Games.scss"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"

export default function Home() {
  // const [startIndex, setStartIndex] = useState(0)
  const [jdrCardData, setJdrCardData] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4242/card")
      // console.log(response.data)
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

  const handleNext = (section) => {
    switch (section) {
      case "allGamesSection":
        setStartIndexAllGames((startIndexAllGames + 2) % jdrCardData.length)
        break
      case "fantasticGamesSection":
        setStartIndexFantastic((startIndexFantastic + 2) % jdrCardData.length)
        break
      case "horrorGamesSection":
        setStartIndexHorror((startIndexHorror + 2) % jdrCardData.length)
        break
      case "westernGamesSection":
        setStartIndexWestern((startIndexWestern + 2) % jdrCardData.length)
        break
      default:
        break
    }
  }

  const handlePrevious = (section) => {
    switch (section) {
      case "allGamesSection":
        setStartIndexAllGames(
          (startIndexAllGames - 2 + jdrCardData.length) % jdrCardData.length
        )
        break
      case "fantasticGamesSection":
        setStartIndexFantastic(
          (startIndexFantastic - 2 + jdrCardData.length) % jdrCardData.length
        )
        break
      case "horrorGamesSection":
        setStartIndexHorror(
          (startIndexHorror - 2 + jdrCardData.length) % jdrCardData.length
        )
        break
      case "westernGamesSection":
        setStartIndexWestern(
          (startIndexWestern - 2 + jdrCardData.length) % jdrCardData.length
        )
        break
      default:
        break
    }
  }
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
          <ul>
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
              <h1 className="All">"ALL</h1>
              <h2 className="gamezzz">GAMES"</h2>
            </div>
            <div className="jdrCardApp">
              {jdrCardData
                .slice(startIndexAllGames, startIndexAllGames + 2)
                .map((jdr) => (
                  <JdrCard key={jdr.id} {...jdr} />
                ))}

              <div className="pagination">
                <button
                  className="boutonPrev"
                  onClick={() => handlePrevious("allGamesSection")}
                >
                  <img src={previous} alt="" />
                </button>
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

        {jdrCardData.length > 0 && (
          <section className="home__content__games" id="fantasticGamesSection">
            <div className="allGames">
              <h1 className="All">"FANTASTIC</h1>
              <h2 className="gamezzz">GAMES"</h2>
            </div>
            <div className="jdrCardApp">
              {jdrCardData
                .slice(startIndexFantastic, startIndexFantastic + 2)
                .map((jdr, index) => (
                  <React.Fragment key={jdr.id}>
                    {jdr.jdrCategory === "Fantastic" && <JdrCard {...jdr} />}
                  </React.Fragment>
                ))}

              <div className="pagination">
                <button
                  className="boutonPrev"
                  onClick={() => handlePrevious("fantasticGamesSection")}
                >
                  <img src={previous} alt="" />
                </button>
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
              {jdrCardData
                .slice(startIndexHorror, startIndexHorror + 2)
                .map((jdr) => (
                  <React.Fragment key={jdr.id}>
                    {jdr.jdrCategory === "Horror" && <JdrCard {...jdr} />}
                  </React.Fragment>
                ))}

              <div className="pagination">
                <button
                  className="boutonPrev"
                  onClick={() => handlePrevious("horrorGamesSection")}
                >
                  <img src={previous} alt="" />
                </button>
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
              {jdrCardData
                .slice(startIndexWestern, startIndexWestern + 2)
                .map((jdr) => (
                  <React.Fragment key={jdr.id}>
                    {jdr.jdrCategory === "Western" && <JdrCard {...jdr} />}
                  </React.Fragment>
                ))}

              <div className="pagination">
                <button
                  className="boutonPrev"
                  onClick={() => handlePrevious("westernGamesSection")}
                >
                  <img src={previous} alt="" />
                </button>
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
