import React, { useState } from "react"
import JdrCard from "../components/global/JdRcard"
import StarRating from "../components/home/CarouselNote"
import Footer from "../components/global/Footer"
import IntroHome from "../components/home/IntroHome"
import "./Home.scss"

import livre from "../assets/images/Calque2.png"
import merlin from "../assets/images/logo_merlin.png"
import gargouille from "../assets/images/imgmalefice.png"
import grave from "../assets/images/grave.png"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"
import noParallaxImg from "../assets/images/parallax/castleNewSize1.png"
import cascadeImg from "../assets/images/cascadeImg.png"
// import HomeParallax from "../components/home/HomeParallax"

export const jdrCardData = [
  {
    id: 1,
    jdrName: "Le Déclin des Ames",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#EBAD50",
    jdrNameFontSize: "30px",
    jdrNameTextStyle: "italic underline",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText:
      "Your choices shape your destiny, explore the decline and become a legend.",
    textColor: "White",
    textFont: "cinzel decorative",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#EBAD50",
    buttonColor: "#CF5C2B",
    buttonFont: "Inika",
  },
  {
    id: 2,
    jdrName: "MALEFICES",
    jdrNameFontSize: "30px",
    jdrNameFont: "Inika",
    jdrNameColor: "#F3AD44",
    jdrImg1: gargouille,
    jdrImg2: grave,
    jdrText:
      "Will you dare to unravel the enchanting mysteries of 'Malefices'?",
    textColor: "white",
    textFont: "cinzel decorative",
    jdrBgColor1: "#660E0E",
    jdrBgColor2: "#1d2327",
    buttonColor: "#AF2D2D",
    buttonFont: "Inika",
  },
  {
    id: 3,
    jdrName: "Le Déclin des Ames",
    jdrNameFontSize: "30px",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#EBAD50",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText:
      "Your choices shape your destiny, explore the decline and become a legend.",
    textColor: "white",
    textFont: "cinzel decorative",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#EBAD50",
    buttonColor: "#CF5C2B",
    buttonFont: "Inika",
  },
  {
    id: 4,
    jdrName: "Le Déclin des Ames",
    jdrNameFontSize: "30px",
    jdrNameFont: "Cinzel Decorative",
    jdrNameColor: "#EBAD50",
    jdrImg1: merlin,
    jdrImg2: livre,
    jdrText:
      "Your choices shape your destiny, explore the decline and become a legend.",
    textColor: "white",
    textFont: "cinzel decorative",
    jdrBgColor1: "#44114D",
    jdrBgColor2: "#EBAD50",
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
      <section className="home__hero">
        {/* <HomeParallax /> */}
        <div className="image-container">
          <img className="noParallaxImg" src={noParallaxImg} alt="castle" />
          <img className="cascadeImg" src={cascadeImg} alt="cascade" />
        </div>
      </section>
      <main className="home__content">
        <section className="home__content__description">
          <IntroHome />
        </section>
        <section className="home__content__games">
          <div className="allGames">
            <h1 className="All">"ALL</h1>
            <h2 className="gamezzz">GAMES"</h2>
          </div>
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
        <section className="home__content__avis">
          <StarRating />
        </section>
      </main>

      <Footer />
    </>
  )
}
