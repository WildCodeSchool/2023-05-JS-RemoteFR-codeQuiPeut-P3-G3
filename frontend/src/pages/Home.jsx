import React, { useState, useEffect } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import axios from "axios"
import JdrCard from "../components/global/JdRcard"
import StarRating from "../components/home/CarouselNote"
import Footer from "../components/global/Footer"
import IntroHome from "../components/home/IntroHome"
import "./Home.scss"
// import livre from "../assets/images/Calque2.png"
// import merlin from "../assets/images/logo_merlin.png"
// import gargouille from "../assets/images/imgmalefice.png"
// import grave from "../assets/images/grave.png"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"
import HomeParallax from "../components/home/HomeParallax"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [startIndex, setStartIndex] = useState(0)
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

  const handleNext = () => {
    setStartIndex((startIndex + 2) % jdrCardData.length)
  }

  const handlePrevious = () => {
    setStartIndex((startIndex - 2 + jdrCardData.length) % jdrCardData.length)
  }

  // GSAP parallax ------------------
  const pinMainDiv = () => {
    gsap.from(".image-container", {
      scrollTrigger: {
        trigger: ".belowParallax",
        start: "top bottom",
        end: "top top",
        pin: true,
        pinSpacing: true,
        id: "mainDiv",
      },
    })
  }
  useEffect(() => {
    pinMainDiv()
  }, [])

  const pinFooter = () => {
    gsap.to(".home__content", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "top top",
        pin: true,
        pinSpacing: true,
        id: "footerDiv",
      },
    })
  }
  useEffect(() => {
    pinFooter()
  }, [])

  return (
    <div>
      <section className="home__hero">
        <div className="image-container">
          <HomeParallax />
        </div>
      </section>

      <section className="belowParallax">
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
      </section>
      <section className="footer">
        <Footer />
      </section>
    </div>
  )
}
