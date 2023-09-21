import { Link } from "react-router-dom"
import "./SelectHeroes.scss"
// import heroes from "../Game/Components/json/heroes.json"
// import Barbare from "../Game/Components/assets/img/heroes/archer.png"
import knight from "../Game/Components/assets/img/heroes/knight.png"
import { useEffect } from "react"
import { useGameContext } from "../../services/contexts/GameContext"

function SelectHeroes({ setInit }) {
  // document.cookie = "volume=60"
  // document.cookie = "volumeToggle=true"
  // localStorage.setItem("quest", JSON.stringify(0))
  // localStorage.setItem("page", JSON.stringify(0))

  // eslint-disable-next-line no-unused-vars
  const { getHero, hero, setHeroSelected } = useGameContext()
  const { getParamsUrl } = useGameContext()
  const {
    sceneSettings: { storyId },
  } = useGameContext()

  useEffect(() => {
    getHero(getParamsUrl())
  }, [])
  return (
    <div className="characters">
      <h1>Choisissez votre héroïne</h1>

      <div className="heroes">
        {hero &&
          hero.map((hero, index) => {
            return (
              <Link
                to={`/game?story=${storyId}&scene=0`}
                key={hero.name}
                draggable={false}
              >
                <div
                  className="heroesCard"
                  onClick={() => {
                    localStorage.setItem("hero", JSON.stringify(hero))
                    setHeroSelected(hero)
                    setInit(false)
                  }}
                >
                  <div className="hero" key={hero.index}>
                    <img
                      src={`${
                        hero.img !== ""
                          ? `http://localhost:4242/uploads/${hero.img}`
                          : knight
                      }`}
                      // src={hero?.class === "barbare" ? Barbare : knight}
                      alt="hero"
                      className="imgHero"
                      draggable={false}
                    />
                    <div className="profil">
                      <h2>{hero.name}</h2>
                    </div>
                  </div>
                  <div className="heroSkills">
                    <h2>Statistiques</h2>
                    <div key={hero.skills}>
                      <ul>
                        <li>points de vie: {hero.heal} </li>
                        <li>pieces d&#39;or: {hero.money} </li>
                        <li>Agilité: {hero.skills.agility}</li>
                        <li>Force: {hero.skills.strength}</li>
                        <li>Intelligence: {hero.skills.intelligence}</li>
                        <li>Resistance: {hero.skills.resistance}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default SelectHeroes
