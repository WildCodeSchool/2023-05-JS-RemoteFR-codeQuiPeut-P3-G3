// import HomeParallax from "../components/home/HomeParallax"
import IntroHome from "../components/home/IntroHome"
import "./Home.scss"
import StarRating from "../components/home/CarouselNote"

import Footer from "../components/global/Footer"
import noParallaxImg from "../assets/images/parallax/castleNewSize1.png"
import cascadeImg from "../assets/images/cascadeImg.png"

export default function Home() {
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
        <section className="home__content__games"></section>
        <section className="home__content__avis">
          <StarRating />
        </section>
      </main>

      <Footer />
    </>
  )
}
