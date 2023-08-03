import React, { useEffect, useRef } from "react"

import cloudsBack from "../../assets/images/parallax/cloudsBack1.png"
import cloudsFront from "../../assets/images/parallax/cloudsFront1.png"
import moon from "../../assets/images/parallax/moon1.png"
import castle from "../../assets/images/parallax/castle1.png"
import stars from "../../assets/images/parallax/stars1.png"

import "./HomeParallax.scss"

export default function HomeParallax() {
  const parallaxSectionRef = useRef(null)
  const castleRef = useRef(null)
  const cloudsBackRef = useRef(null)
  const cloudsFrontRef = useRef(null)
  const moonRef = useRef(null)
  const starsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY
      const parallaxSectionHeight = parallaxSectionRef.current.clientHeight

      if (value <= parallaxSectionHeight) {
        // castleRef.current.style.top = value * 0.5 + "px"
        cloudsBackRef.current.style.left = value * 1 + "px"
        cloudsFrontRef.current.style.left = value * 1.5 + "px"
        // moonRef.current.style.top = -value * 1.5 + "px"
        starsRef.current.style.left = value * 0.25 + "px"

        const moonStartPosition = parallaxSectionHeight * 0.5
        const moonEndPosition = 0
        const moonPosition =
          moonStartPosition +
          (value / parallaxSectionHeight) *
            (moonEndPosition - moonStartPosition)
        moonRef.current.style.top = moonPosition + "px"

        const castleStartPosition = 0
        const castleEndPosition = parallaxSectionHeight * 0.5
        const castlePosition =
          castleStartPosition +
          (value / parallaxSectionHeight) *
            (castleEndPosition - castleStartPosition)
        castleRef.current.style.top = castlePosition + "px"
      } else {
        castleRef.current.style.top =
          parallaxSectionRef.current.clientHeight * 0.5 + "px"
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <section ref={parallaxSectionRef} className="parallaxSection">
        <img
          ref={cloudsBackRef}
          className="cloudsBackImg"
          src={cloudsBack}
          alt=""
        />
        <img
          ref={cloudsFrontRef}
          className="cloudsFrontImg"
          src={cloudsFront}
          alt=""
        />
        <img ref={moonRef} className="moonImg" src={moon} alt="" />
        <img ref={castleRef} className="castleImg" src={castle} alt="" />
        <img ref={starsRef} className="starsImg" src={stars} alt="" />
      </section>
    </>
  )
}
