import IntroHome from "../components/home/IntroHome"
import "./Home.scss"
import StarRating from "../components/home/CarouselNote"

import Footer from "../components/global/Footer"
export default function Home() {
  return (
    <>
      <section className="home__hero"></section>
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
