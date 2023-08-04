import "./Home.scss"
import StarRating from "../components/home/CarouselNote"

export default function Home() {
  return (
    <>
      <section className="home__hero"></section>
      <main className="home__content">
        <section className="home__content__description"></section>
        <section className="home__content__games"></section>
        <section className="home__content__avis">
          <StarRating />
        </section>
      </main>
      <footer>
        <h3 style={{ textAlign: "center" }}> footer </h3>
      </footer>
    </>
  )
}
