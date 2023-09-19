import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

// import castleDark from "../../assets/images/parallax/castleDark-01.png"
import castleLights from "../../assets/images/parallax/castleLights.png"
import cloudsBack from "../../assets/images/parallax/cloudsBack1.png"
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
  const cloudsBackRef = useRef(null)
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
  // gsap.set(castleLightsRef, {
  //   opacity: 0,
  // })

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: parallaxSectionRef.current,
  //     start: "top top",
  //     end: "bottom top",
  //     pin: true,
  //     pinSpacing: false,
  //     id: "castleLights",
  //   },
  // })

  // tl.to(castleLightsRef, { opacity: 1 })

  const pinCastleLights = () => {
    gsap.to(castleLightsRef.current, {
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        id: "castleDark",
      },
    })
  }

  useEffect(() => {
    pinCastleLights()
  }, [])

  //  TODO------------------- Switch between castle images --------------
  // const switchCastleImg = () => {
  //   gsap.to(castleDarkRef.current, {
  //     opacity: 0,
  //     duration: 0.5,
  //     onComplete: () => {
  //       gsap.set(castleLightsRef.current, { opacity: 1 })
  //     },
  //   })
  // }

  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: parallaxSectionRef.current,
  //     start: "top top",
  //     end: "70% 100%",
  //     onToggle: (self) => {
  //       if (self.isActive) {
  //         switchCastleImg()
  //       }
  //     },
  //   })
  // }, [])

  //  TODO---------------- Move the front clouds to the left -------------------

  const moveCloudsFront = () => {
    gsap.from(cloudsFrontRef.current, {
      x: -2000,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 20,
        duration: 10,
        id: "cloudsFront",
      },
    })
  }

  useEffect(() => {
    moveCloudsFront()
  }, [])

  //  TODO---------------- Move the back clouds to the right -------------------
  const moveCloudsBack = () => {
    gsap.from(cloudsBackRef.current, {
      x: 2200,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 20,
        duration: 10,
        id: "cloudsBack",
      },
    })
  }

  useEffect(() => {
    moveCloudsBack()
  }, [])

  //  TODO---------------- Move the stars to the right -------------------
  const moveStars = () => {
    gsap.from(starsRef.current, {
      y: -1000,
      scrollTrigger: {
        trigger: parallaxSectionRef.current,
        start: "top top",
        end: "bottom bottom",
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

  // ----------------- To tell that the parallax effect is complete -----------------

  return (
    <>
      <div className="parallaxMain">
        <section ref={parallaxSectionRef} className="parallaxSection">
          <img ref={skyRef} className="skyImg" src={sky} alt="" />
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
          {/* <img
            ref={castleDarkRef}
            className="castleDarkImg"
            src={castleDark}
            alt=""
          /> */}
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

// import React, { useEffect, useRef, useState } from "react"

// import cloudsBack from "../../assets/images/parallax/cloudsBack1.png"
// import cloudsFront from "../../assets/images/parallax/cloudsFront1.png"
// import moon from "../../assets/images/parallax/moonDown2.png"
// import castle from "../../assets/images/parallax/castle1.png"
// import stars from "../../assets/images/parallax/stars1.png"

// import "./HomeParallax.scss"

// export default function HomeParallax() {
//   const parallaxSectionRef = useRef(null)
//   const castleRef = useRef(null)
//   const cloudsBackRef = useRef(null)
//   const cloudsFrontRef = useRef(null)
//   const moonRef = useRef(null)
//   const starsRef = useRef(null)
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const [scrollPastparallax, setScrollPastParallax] = useState(false)
//   const [parallaxInProgress, setParallaxInProgress] = useState(false)

//   useEffect(() => {
//     const handleScroll = (e) => {
//       const value = window.scrollY
//       const parallaxSectionHeight = parallaxSectionRef.current.clientHeight

//       if (value <= parallaxSectionHeight && !parallaxInProgress) {
//         e.preventDefault()
//         cloudsFrontRef.current.style.left = -value * 1.5 + "px"
//         moonRef.current.style.top = value * 1 + "px"
//         starsRef.current.style.left = value * 0.25 + "px"

//         const moonStartPosition = parallaxSectionHeight * 0.5
//         const moonEndPosition = 0
//         const moonPosition =
//           moonStartPosition +
//           (value / parallaxSectionHeight) *
//             (moonEndPosition - moonStartPosition)
//         moonRef.current.style.top = moonPosition + "px"

//         const castleStartPosition = 0
//         const castleEndPosition = parallaxSectionHeight * 0.5
//         const castlePosition =
//           castleStartPosition +
//           ((moonPosition - moonStartPosition) /
//             (moonEndPosition - moonStartPosition)) *
//             (castleEndPosition - castleStartPosition)

//         if (moonPosition <= moonEndPosition) {
//           castleRef.current.style.transform = `translateY(${castleStartPosition}px)`
//         } else {
//           castleRef.current.style.transform = `translateY(${castlePosition}px)`
//         }

//         setScrollPosition(value)

//         if (!scrollPastparallax) {
//           setScrollPastParallax(false)
//         }
//       } else {
//         if (!scrollPastparallax) {
//           castleRef.current.style.transform = `translateY(${
//             parallaxSectionHeight * 0.5
//           }px)`
//           setScrollPastParallax(true)
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll, { passive: false })
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [parallaxInProgress, scrollPastparallax])

//   useEffect(() => {
//     const parallaxSectionHeight = parallaxSectionRef.current.clientHeight
//     const onParallaxComplete = () => {
//       setParallaxInProgress(false)
//     }
//     const parallaxDuration = 2000
//     const timeoutId = setTimeout(onParallaxComplete, parallaxDuration)
//     setParallaxInProgress(true)
//     return () => clearTimeout(timeoutId)
//   }, [])

//   return (
//     <>
//       <div className="parallaxMain">
//         <section ref={parallaxSectionRef} className="parallaxSection">
//           <img
//             ref={cloudsBackRef}
//             className="cloudsBackImg"
//             src={cloudsBack}
//             alt=""
//           />
//           <img
//             ref={cloudsFrontRef}
//             className="cloudsFrontImg"
//             src={cloudsFront}
//             alt=""
//           />
//           <img ref={moonRef} className="moonImg" src={moon} alt="" />
//           <img
//             ref={castleRef}
//             className={`castleImg ${scrollPastparallax ? "fixed" : ""}`}
//             src={castle}
//             alt=""
//           />
//           <img ref={starsRef} className="starsImg" src={stars} alt="" />
//         </section>
//       </div>
//     </>
//   )
// }
