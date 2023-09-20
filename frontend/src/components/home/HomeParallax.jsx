import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import castleLights from "../../assets/images/parallax/castleNew2.png"
import cloudsFront from "../../assets/images/parallax/cloudsFront1.png"
import moon from "../../assets/images/parallax/moonDown.png"
import sky from "../../assets/images/parallax/sky1.png"
import stars from "../../assets/images/parallax/stars1.png"

import "./HomeParallax.scss"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollTrigger)

export default function HomeParallax() {
  const parallaxSectionRef = useRef(null)
  // const castleDarkRef = useRef(null)
  const castleLightsRef = useRef(null)
  const cloudsFrontRef = useRef(null)
  const moonRef = useRef(null)
  const starsRef = useRef(null)
  const skyRef = useRef(null)

  // -------------- ScrollTrigger default settings ---------------
  ScrollTrigger.defaults({
    toggleActions: "play none reverse reset",
    markers: false,
  })

  // TODO------------- Pin the castle image to a fixed position -----------------

  const pinCastleLights = () => {
    gsap.to(castleLightsRef.current, {
      // autoAlpha: 1,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        id: "castleLights",
      },
    })
  }

  useEffect(() => {
    pinCastleLights()
  }, [])

  //  TODO---------------- Move the front clouds to the left -------------------

  const moveCloudsFront = () => {
    gsap.from(cloudsFrontRef.current, {
      x: -2000,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
        duration: 3,
        id: "cloudsFront",
      },
    })
  }

  useEffect(() => {
    moveCloudsFront()
  }, [])

  //  TODO---------------- Move the stars to the right -------------------
  const moveStars = () => {
    gsap.from(starsRef.current, {
      y: -1000,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 5,
        duration: 5,
        id: "stars",
      },
    })
  }

  useEffect(() => {
    moveStars()
  }, [])

  //  TODO---------------- Move the moon up from behind the mountain -------------------
  const moveMoon = () => {
    gsap.to(moonRef.current, {
      y: -500,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "+=500",
        scrub: 2,
        duration: 3,
        id: "moon",
      },
    })
  }

  useEffect(() => {
    moveMoon()
  }, [])

  // ----------------- To show that the parallax effect is complete -----------------

  return (
    <>
      <div className="parallaxMain">
        <section ref={parallaxSectionRef} className="parallaxSection">
          <img ref={skyRef} className="skyImg" src={sky} alt="" />
          <img
            ref={cloudsFrontRef}
            className="cloudsFrontImg"
            src={cloudsFront}
            alt=""
          />
          <img ref={moonRef} className="moonImg" src={moon} alt="" />
          <img
            ref={castleLightsRef}
            className="castleLightsImg"
            src={castleLights}
            alt=""
          />
          <img ref={starsRef} className="starsImg" src={stars} alt="" />
        </section>
      </div>
    </>
  )
}
