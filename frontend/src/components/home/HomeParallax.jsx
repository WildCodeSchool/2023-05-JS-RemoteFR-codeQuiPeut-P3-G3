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
