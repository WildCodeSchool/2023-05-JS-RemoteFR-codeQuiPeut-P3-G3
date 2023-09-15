// -------------- TEST2 ---------------

// import { useEffect, useRef, useState } from "react"
// import { gsap } from "gsap/gsap-core"
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

// import cloudsBack from "../../assets/images/parallax/cloudsBack1.png"
// import cloudsFront from "../../assets/images/parallax/cloudsFront1.png"
// import moon from "../../assets/images/parallax/moonDown2.png"
// import castle from "../../assets/images/parallax/castle1.png"
// import stars from "../../assets/images/parallax/stars1.png"

// import "./HomeParallax.scss"

// function HomeParallax() {
//   const [background, setBackground] = useState(20)

//   const parallaxSectionRef = useRef(null)
//   const castleRef = useRef(null)
//   const cloudsBackRef = useRef(null)
//   const cloudsFrontRef = useRef(null)
//   const moonRef = useRef(null)
//   const starsRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.registerPlugin(ScrollTrigger)
//       const tl = gsap.timeline({
//         defaults: { duration: 1 },
//         scrollTrigger: {
//           trigger: parallaxSectionRef.current,
//           start: "top top",
//           end: "5000 bottom",
//           scrub: true,
//           pin: true,
//           onUpdate: (self) => {
//             setBackground(Math.ceil(self.progress * 100 + 20))
//           },
//         },
//       })
//       tl.to(
//         castleRef.current,
//         {
//           y: "-=80",
//         },
//         0
//       )
//       tl.to(
//         cloudsBackRef.current,
//         {
//           opacity: 0,
//           duration: 0.5,
//         },
//         0
//       )
//       tl.to(
//         cloudsFrontRef.current,
//         {
//           x: "-20%",
//           opacity: 0,
//         },
//         0
//       )
//       tl.to(
//         moonRef.current,
//         {
//           y: "+=210",
//         },
//         0
//       )
//       tl.to(
//         starsRef.current,
//         {
//           top: 0,
//         },
//         0.5
//       )
//     })
//     return () => ctx.revert()
//   }, [])

//   return (
//     <div className="parallaxMain">
//       <div
//         className="parallaxBkgd"
//         ref={parallaxSectionRef}
//         style={{
//           background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )`,
//         }}
//       >
//         <img
//           ref={cloudsBackRef}
//           className="cloudsBackImg"
//           src={cloudsBack}
//           alt=""
//         />
//         <img
//           ref={cloudsFrontRef}
//           className="cloudsFrontImg"
//           src={cloudsFront}
//           alt=""
//         />
//         <img ref={moonRef} className="moonImg" src={moon} alt="" />
//         <img ref={castleRef} className="castleImg" src={castle} alt="" />
//         <img ref={starsRef} className="starsImg" src={stars} alt="" />
//       </div>
//     </div>
//   )
// }

// export default HomeParallax

// --------------- TEST1 -------------
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
