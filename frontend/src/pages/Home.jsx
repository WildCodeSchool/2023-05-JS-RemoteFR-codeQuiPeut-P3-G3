import React, { useState } from "react"
import JdrCard from "../components/global/JdRcard"
import livre from "../assets/images/Calque2.png"
import merlin from "../assets/images/logo_merlin.png"
import gargouille from "../assets/images/imgmalefice.png"
import grave from "../assets/images/grave.png"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"
import "./Home.scss"

const jdrCardData = [
  {
    id: 1,
    jdrName: "Le Déclin des Ames",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#F3AD44",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText:
      "Lorem Ipsum is simply dummy text oui oui oui bla bla bla baguette de pain avec du beurre et de la confiture",
    textColor: "white",
    textFont: "inika",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#F8C86B",
    buttonColor: "#CF5C2B",
    buttonFont: "Inika",
  },
  {
    id: 2,
    jdrName: "MALEFICES",
    jdrNameFont: "Inika",
    jdrNameColor: "#F3AD44",
    jdrImg1: gargouille,
    jdrImg2: grave,
    jdrText:
      "Lorem Ipsum is simply dummy text ouai izi money izi life sisi man j'adore le ski et toi t'adore le sky ?",
    textColor: "white",
    textFont: "inika",
    jdrBgColor1: "#660E0E",
    jdrBgColor2: "#1d2327",
    buttonColor: "#AF2D2D",
    buttonFont: "Inika",
  },
  {
    id: 3,
    jdrName: "Le Déclin des Ames",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#F3AD44",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText: "Lorem Ipsum is simply dummy text...",
    textColor: "white",
    textFont: "inika",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#F8C86B",
    buttonColor: "#CF5C2B",
    buttonFont: "Inika",
  },
  {
    id: 4,
    jdrName: "Le Déclin des Ames",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#F3AD44",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText: "Lorem Ipsum is simply dummy text...",
    textColor: "white",
    textFont: "inika",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#F8C86B",
    buttonColor: "#CF5C2B",
    buttonFont: "Inika",
  },
]

export default function Home() {
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = () => {
    setStartIndex((startIndex + 2) % jdrCardData.length)
  }

  const handlePrevious = () => {
    setStartIndex((startIndex - 2 + jdrCardData.length) % jdrCardData.length)
  }

  return (
    <>
      <section className="home__hero"></section>
      <main className="home__content">
        <section className="home__content__description"></section>
        <section className="home__content__games">
          <div className="jdrCardApp">
            {jdrCardData.slice(startIndex, startIndex + 2).map((jdr) => (
              <JdrCard key={jdr.id} {...jdr} />
            ))}

            <div className="pagination">
              <button className="boutonPrev" onClick={handlePrevious}>
                <img src={previous} alt="" />
              </button>
              <button className="boutonNext" onClick={handleNext}>
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </section>
        <section className="home__content__avis"></section>
      </main>

      {/* FOOTER */}
      <footer>
        {/* -> Footer à ajouter ici */}
        <h3 style={{ textAlign: "center" }}> footer </h3>
      </footer>
    </>
  )
}
