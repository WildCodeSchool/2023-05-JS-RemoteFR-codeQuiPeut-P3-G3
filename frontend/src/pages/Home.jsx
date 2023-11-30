import React, { useState, useEffect, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { useNavigate } from "react-router-dom"
import ScrollTrigger from "gsap/ScrollTrigger"

import axios from "axios"
import JdrCard from "../components/global/JdRcard"
import StarRating from "../components/home/CarouselNote"
import Footer from "../components/global/Footer"
import IntroHome from "../components/home/IntroHome"
import "./Home.scss"
import "../components/home/Caroussel.scss"
import previous from "../assets/images/chevron-left-512.webp"
import next from "../assets/images/chevron-right-512.webp"
import HomeParallax from "../components/home/HomeParallax"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [startIndex, setStartIndex] = useState(0)
  const [jdrCardData, setJdrCardData] = useState([])
  const navigate = useNavigate()
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

  /* Detection largeur écran */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleNext = () => {
    setStartIndex((startIndex + 2) % jdrCardData.length)
  }

  const handlePrevious = () => {
    setStartIndex((startIndex - 2 + jdrCardData.length) % jdrCardData.length)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      pinMainDiv()
      pinFooter()
    })
    return () => ctx.revert() // nettoyage de gsap
  }, [])

  const pinFooter = () => {
    gsap.to(".home__content", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "top top",
        pin: true,
        pinSpacing: true,
        id: "footerDiv",
      },
    })
  }
  const pinMainDiv = () => {
    gsap.from(".image-container", {
      scrollTrigger: {
        trigger: ".belowParallax",
        start: "top top",
        end: "top top",
        pin: true,
        pinSpacing: true,
        id: "mainDiv",
      },
    })
  }

  const handleClick = (index) => {
    navigate(`/game?story=${index}&scene=0`)
  }

  return (
    <div>
      <section className="home__hero">
        <div className="image-container">
          <HomeParallax />
        </div>
      </section>

      <div className="belowParallax">
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
              <div className="pagination">
                <button className="boutonPrev" onClick={handlePrevious}>
                  <img src={previous} alt="" />
                </button>
              </div>
              {windowWidth >= 800
                ? jdrCardData
                    .slice(startIndex, startIndex + 2)
                    .map((jdr, index) => (
                      <div key={jdr.idcard} className="carourou">
                        <JdrCard
                          key={jdr.idcard}
                          {...jdr}
                          handleClick={() => handleClick(jdr.storyId)}
                        />
                      </div>
                    ))
                : jdrCardData
                    .slice(startIndex, startIndex + 1)
                    .map((jdr, index) => (
                      <JdrCard
                        key={jdr.idcard}
                        {...jdr}
                        handleClick={() => handleClick(jdr.storyId)}
                      />
                    ))}

              <div className="pagination">
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
      </div>
      <section className="footer">
        <Footer />
      </section>
    </div>
  )
}
